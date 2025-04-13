const fs = require('fs');
const path = require('path');

// State codes from dataMappings.js
const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC', 'PR'
];

// All specialty slugs from dataMappings.js with appropriate priorities
const specialtySlugs = [
  // Primary care specialties (highest priority)
  { slug: 'internal-medicine', priority: 0.9 },
  { slug: 'family-medicine', priority: 0.9 },
  { slug: 'pediatrics', priority: 0.9 },
  
  // High-demand specialties
  { slug: 'cardiology', priority: 0.9 },
  { slug: 'orthopedic-surgery', priority: 0.9 },
  { slug: 'dermatology', priority: 0.9 },
  { slug: 'obstetrics-gynecology', priority: 0.8 },
  
  // Common medical specialties
  { slug: 'emergency-medicine', priority: 0.8 },
  { slug: 'neurology', priority: 0.8 },
  { slug: 'psychiatry', priority: 0.8 },
  { slug: 'gastroenterology', priority: 0.8 },
  { slug: 'medical-oncology', priority: 0.8 },
  { slug: 'hematology-oncology', priority: 0.8 },
  
  // Surgical specialties
  { slug: 'surgery', priority: 0.7 },
  { slug: 'surgical-critical-care', priority: 0.7 },
  { slug: 'pediatric-surgery', priority: 0.7 },
  
  // Other specialties
  { slug: 'anesthesiology', priority: 0.7 },
  { slug: 'diagnostic-radiology', priority: 0.7 },
  { slug: 'clinical-cardiac-electrophysiology', priority: 0.7 },
  { slug: 'interventional-cardiology', priority: 0.7 }
];

// Priority states to use higher priority for
const priorityStates = ['CA', 'TX', 'NY', 'FL', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'];

// Generate sitemap XML
function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>https://providerintelligences.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://providerintelligences.com/pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- State/Specialty Pages -->
`;

  // Generate entries for all state/specialty combinations
  states.forEach(state => {
    const stateLower = state.toLowerCase();
    const isHighPriorityState = priorityStates.includes(state);
    
    specialtySlugs.forEach(({ slug, priority }) => {
      // Adjust priority for high priority states
      const urlPriority = isHighPriorityState ? Math.min(priority + 0.1, 0.9) : priority;
      
      xml += `  <url>
    <loc>https://providerintelligences.com/${stateLower}/${slug}</loc>
    <changefreq>daily</changefreq>
    <priority>${urlPriority.toFixed(1)}</priority>
  </url>
`;
    });
  });

  xml += '</urlset>';
  
  // Write to sitemap.xml
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
  
  console.log(`Sitemap generated with ${states.length * specialtySlugs.length} state/specialty combinations.`);
}

// Run the generator
generateSitemap(); 