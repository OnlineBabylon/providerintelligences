const { MongoClient } = require('mongodb');

// MongoDB connection settings
const mongoUri = 'mongodb://localhost:27017';
const dbName = 'nppes_database';

// Format a timestamp
function getTimestamp() {
  const now = new Date();
  return now.toISOString();
}

// Format memory usage
function formatMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  return {
    rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
  };
}

// Calculate time elapsed
function getElapsedTime(startTime) {
  const elapsed = Date.now() - startTime;
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

// Log with timestamp
function logWithTimestamp(message, startTime = null) {
  const timestamp = getTimestamp();
  const timeInfo = startTime ? ` (elapsed: ${getElapsedTime(startTime)})` : '';
  console.log(`[${timestamp}]${timeInfo} ${message}`);
}

async function mergeCollections() {
  const client = new MongoClient(mongoUri);
  const startTime = Date.now();
  
  try {
    // Connect to MongoDB
    await client.connect();
    logWithTimestamp('Connected to MongoDB', startTime);
    
    const db = client.db(dbName);
    
    // Check if collections exist
    logWithTimestamp('Checking required collections...', startTime);
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    const requiredCollections = ['providers', 'practiceLocations', 'otherNames', 'endpoints'];
    for (const coll of requiredCollections) {
      if (!collectionNames.includes(coll)) {
        logWithTimestamp(`ERROR: Required collection '${coll}' does not exist!`, startTime);
        process.exit(1);
      }
    }
    
    logWithTimestamp('All required collections exist.', startTime);
    
    // Get document counts for each collection - using estimatedDocumentCount for speed
    logWithTimestamp('Getting estimated document counts (faster than exact count)...', startTime);
    const providerCount = await db.collection('providers').estimatedDocumentCount();
    const practiceLocationsCount = await db.collection('practiceLocations').estimatedDocumentCount();
    const otherNamesCount = await db.collection('otherNames').estimatedDocumentCount();
    const endpointsCount = await db.collection('endpoints').estimatedDocumentCount();
    
    // Alternative method using stats() - even faster for very large collections
    // const providerStats = await db.collection('providers').stats();
    // const providerCount = providerStats.count;
    
    logWithTimestamp(`Collection sizes (estimated):`, startTime);
    logWithTimestamp(`- providers: ${providerCount.toLocaleString()} documents`, startTime);
    logWithTimestamp(`- practiceLocations: ${practiceLocationsCount.toLocaleString()} documents`, startTime);
    logWithTimestamp(`- otherNames: ${otherNamesCount.toLocaleString()} documents`, startTime);
    logWithTimestamp(`- endpoints: ${endpointsCount.toLocaleString()} documents`, startTime);
    
    // Drop existing merged collection if it exists
    if (collectionNames.includes('mergedProviders')) {
      logWithTimestamp('Dropping existing mergedProviders collection...', startTime);
      await db.collection('mergedProviders').drop();
    }
    
    // Process in batches if the collection is large
    const BATCH_SIZE = 100000; // Process 100k documents at a time
    const totalBatches = Math.ceil(providerCount / BATCH_SIZE);
    
    logWithTimestamp(`Starting merge process in ${totalBatches} batches of ${BATCH_SIZE.toLocaleString()} documents each`, startTime);
    logWithTimestamp(`Memory usage before processing: ${JSON.stringify(formatMemoryUsage())}`, startTime);
    
    if (providerCount <= BATCH_SIZE) {
      // If small enough, process all at once
      logWithTimestamp('Collection size is manageable, processing all at once...', startTime);
      await processFullCollection(db, startTime);
    } else {
      // Process in batches
      await processBatches(db, BATCH_SIZE, totalBatches, startTime);
    }
    
    // Create indexes on the merged collection
    logWithTimestamp('Creating indexes on merged collection...', startTime);
    await db.collection('mergedProviders').createIndex({ "NPI": 1 });
    await db.collection('mergedProviders').createIndex({ 
      "Provider Last Name (Legal Name)": "text", 
      "Provider First Name": "text", 
      "Provider Organization Name (Legal Business Name)": "text" 
    });
    logWithTimestamp('Indexes created successfully.', startTime);
    
    // Get final document count - using estimatedDocumentCount for speed
    const mergedCount = await db.collection('mergedProviders').estimatedDocumentCount();
    
    logWithTimestamp(`Merge completed!`, startTime);
    logWithTimestamp(`Original providers (estimated): ${providerCount.toLocaleString()} documents`, startTime);
    logWithTimestamp(`Merged providers (estimated): ${mergedCount.toLocaleString()} documents`, startTime);
    logWithTimestamp(`Memory usage after processing: ${JSON.stringify(formatMemoryUsage())}`, startTime);
    
    // Check for any lost documents
    if (mergedCount !== providerCount) {
      logWithTimestamp(`NOTE: Document count difference detected (${providerCount - mergedCount}), but this may be due to using estimated counts`, startTime);
    } else {
      logWithTimestamp(`All documents successfully merged.`, startTime);
    }
    
  } catch (error) {
    logWithTimestamp(`ERROR merging collections: ${error.message}`, startTime);
    console.error(error);
  } finally {
    await client.close();
    logWithTimestamp('MongoDB connection closed.', startTime);
    logWithTimestamp(`Total execution time: ${getElapsedTime(startTime)}`, startTime);
  }
}

// Process the entire collection at once
async function processFullCollection(db, startTime) {
  logWithTimestamp('Building aggregation pipeline...', startTime);
  
  // Define the aggregation pipeline
  const pipeline = [
    {
      $lookup: {
        from: "practiceLocations",
        localField: "NPI",
        foreignField: "NPI",
        as: "practiceLocations"
      }
    },
    {
      $lookup: {
        from: "otherNames",
        localField: "NPI",
        foreignField: "NPI",
        as: "otherNames"
      }
    },
    {
      $lookup: {
        from: "endpoints",
        localField: "NPI",
        foreignField: "NPI",
        as: "endpoints"
      }
    },
    {
      $out: "mergedProviders"
    }
  ];
  
  logWithTimestamp('Starting aggregation, this may take a long time...', startTime);
  await db.collection('providers').aggregate(pipeline).toArray();
  logWithTimestamp('Aggregation completed.', startTime);
}

// Process the collection in batches
async function processBatches(db, batchSize, totalBatches, startTime) {
  // Create a temporary collection to store the merged results
  const tempCollName = 'mergedProviders_temp';
  
  logWithTimestamp(`Creating temporary collection: ${tempCollName}`, startTime);
  
  try {
    // Process each batch
    for (let batch = 0; batch < totalBatches; batch++) {
      const batchStartTime = Date.now();
      const skip = batch * batchSize;
      
      // For the remaining count, we can use the original providerCount and simple math
      // instead of running another count operation
      const remainingCount = Math.max(0, await db.collection('providers').estimatedDocumentCount() - skip);
      const currentBatchSize = Math.min(batchSize, remainingCount);
      
      logWithTimestamp(`Starting batch ${batch + 1}/${totalBatches} (${skip + 1}-${skip + currentBatchSize})...`, startTime);
      
      // Get this batch of providers
      const batchProviders = await db.collection('providers')
        .find({})
        .skip(skip)
        .limit(currentBatchSize)
        .toArray();
      
      // Extract NPIs for faster joins
      const batchNPIs = batchProviders.map(p => p.NPI);
      logWithTimestamp(`Retrieved ${batchProviders.length} providers`, startTime);
      
      // Get related data for these providers
      logWithTimestamp(`Fetching related data for batch ${batch + 1}...`, startTime);
      
      const practiceLocations = await db.collection('practiceLocations')
        .find({ NPI: { $in: batchNPIs } })
        .toArray();
      logWithTimestamp(`- Found ${practiceLocations.length} practice locations`, startTime);
      
      const otherNames = await db.collection('otherNames')
        .find({ NPI: { $in: batchNPIs } })
        .toArray();
      logWithTimestamp(`- Found ${otherNames.length} other names`, startTime);
      
      const endpoints = await db.collection('endpoints')
        .find({ NPI: { $in: batchNPIs } })
        .toArray();
      logWithTimestamp(`- Found ${endpoints.length} endpoints`, startTime);
      
      // Group related data by NPI for faster lookups
      const practiceLocationsByNPI = groupByNPI(practiceLocations);
      const otherNamesByNPI = groupByNPI(otherNames);
      const endpointsByNPI = groupByNPI(endpoints);
      
      // Create merged records
      logWithTimestamp(`Creating merged documents for batch ${batch + 1}...`, startTime);
      const mergedBatch = batchProviders.map(provider => {
        const npi = provider.NPI;
        return {
          ...provider,
          practiceLocations: practiceLocationsByNPI[npi] || [],
          otherNames: otherNamesByNPI[npi] || [],
          endpoints: endpointsByNPI[npi] || []
        };
      });
      
      // Insert the merged batch
      logWithTimestamp(`Inserting ${mergedBatch.length} merged documents...`, startTime);
      await db.collection('mergedProviders').insertMany(mergedBatch);
      
      const batchTime = getElapsedTime(batchStartTime);
      logWithTimestamp(`Batch ${batch + 1}/${totalBatches} completed in ${batchTime}`, startTime);
      logWithTimestamp(`Memory usage: ${JSON.stringify(formatMemoryUsage())}`, startTime);
      
      // Estimate remaining time
      const avgBatchTime = (Date.now() - startTime) / (batch + 1);
      const remainingBatches = totalBatches - (batch + 1);
      const estimatedTimeRemaining = remainingBatches * avgBatchTime;
      const estimatedTimeStr = formatEstimatedTime(estimatedTimeRemaining);
      
      if (remainingBatches > 0) {
        logWithTimestamp(`Estimated time remaining: ${estimatedTimeStr}`, startTime);
      }
    }
    
  } catch (error) {
    logWithTimestamp(`Error during batch processing: ${error.message}`, startTime);
    throw error;
  }
}

// Group an array of objects by NPI field
function groupByNPI(items) {
  const result = {};
  for (const item of items) {
    const npi = item.NPI;
    if (!result[npi]) {
      result[npi] = [];
    }
    result[npi].push(item);
  }
  return result;
}

// Format estimated time
function formatEstimatedTime(timeMs) {
  const seconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

// Run the merge
mergeCollections(); 