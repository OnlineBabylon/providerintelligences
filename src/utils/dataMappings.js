/**
 * Data mapping utilities for healthcare provider state and specialty data
 */

// Map state codes to full names
const stateMappings = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
  'DC': 'District of Columbia',
  'PR': 'Puerto Rico',
  'VI': 'Virgin Islands',
  'GU': 'Guam',
  'AS': 'American Samoa',
  'MP': 'Northern Mariana Islands'
};

// Map specialty codes to readable names
// Source: NUCC Health Care Provider Taxonomy
const specialtyMappings = {
  // Internal Medicine
  '207R00000X': 'Internal Medicine',
  // Cardiology
  '207RC0000X': 'Cardiology',
  '207RC0001X': 'Clinical Cardiac Electrophysiology',
  '207RI0011X': 'Interventional Cardiology',
  // Family Medicine
  '207Q00000X': 'Family Medicine',
  // Surgery
  '208600000X': 'Surgery',
  '2086S0102X': 'Surgical Critical Care',
  '2086S0120X': 'Pediatric Surgery',
  // Orthopedic Surgery
  '207X00000X': 'Orthopedic Surgery',
  // Pediatrics
  '208000000X': 'Pediatrics',
  // Psychiatry
  '2084P0800X': 'Psychiatry',
  // Neurology
  '2084N0400X': 'Neurology',
  // Radiology
  '2085R0202X': 'Diagnostic Radiology',
  // Dermatology
  '207N00000X': 'Dermatology',
  // Emergency Medicine
  '207P00000X': 'Emergency Medicine',
  // Obstetrics & Gynecology
  '207V00000X': 'Obstetrics & Gynecology',
  // Gastroenterology
  '207RG0100X': 'Gastroenterology',
  // Oncology
  '207RX0202X': 'Medical Oncology',
  '2081H0002X': 'Hematology & Oncology',
  // Anesthesiology
  '207L00000X': 'Anesthesiology',
  // Add more specialties as needed
};

// Specialty slugs for URL paths
const specialtySlugs = {
  '207R00000X': 'internal-medicine',
  '207RC0000X': 'cardiology',
  '207RC0001X': 'clinical-cardiac-electrophysiology',
  '207RI0011X': 'interventional-cardiology',
  '207Q00000X': 'family-medicine',
  '208600000X': 'surgery',
  '2086S0102X': 'surgical-critical-care',
  '2086S0120X': 'pediatric-surgery',
  '207X00000X': 'orthopedic-surgery',
  '208000000X': 'pediatrics',
  '2084P0800X': 'psychiatry',
  '2084N0400X': 'neurology',
  '2085R0202X': 'diagnostic-radiology',
  '207N00000X': 'dermatology',
  '207P00000X': 'emergency-medicine',
  '207V00000X': 'obstetrics-gynecology',
  '207RG0100X': 'gastroenterology',
  '207RX0202X': 'medical-oncology',
  '2081H0002X': 'hematology-oncology',
  '207L00000X': 'anesthesiology',
};

// Related specialties by parent specialty
// These are sample relationships - would need to be refined based on actual provider data
const relatedSpecialtiesMap = {
  '207RC0000X': [ // Cardiology
    { code: '207RI0011X', name: 'Interventional Cardiology', count: 540, slug: 'interventional-cardiology' },
    { code: '207RC0001X', name: 'Clinical Cardiac Electrophysiology', count: 320, slug: 'clinical-cardiac-electrophysiology' },
    { code: '207R00000X', name: 'Internal Medicine', count: 6800, slug: 'internal-medicine' },
    { code: '207Q00000X', name: 'Family Medicine', count: 9200, slug: 'family-medicine' },
  ],
  '207R00000X': [ // Internal Medicine
    { code: '207RC0000X', name: 'Cardiology', count: 2100, slug: 'cardiology' },
    { code: '207RG0100X', name: 'Gastroenterology', count: 1800, slug: 'gastroenterology' },
    { code: '207RH0000X', name: 'Hematology', count: 950, slug: 'hematology' },
    { code: '207RX0202X', name: 'Medical Oncology', count: 1200, slug: 'medical-oncology' },
  ],
  // Add more related specialties by specialty
};

/**
 * Get the full state name from a state code
 * @param {string} stateCode - Two-letter state code
 * @returns {string} Full state name or the original code if not found
 */
export function getStateFullName(stateCode) {
  return stateMappings[stateCode] || stateCode;
}

/**
 * Get a state code from the full name
 * @param {string} stateName - Full state name
 * @returns {string|null} State code or null if not found
 */
export function getStateCode(stateName) {
  const normalizedName = stateName.trim();
  for (const [code, name] of Object.entries(stateMappings)) {
    if (name.toLowerCase() === normalizedName.toLowerCase()) {
      return code;
    }
  }
  return null;
}

/**
 * Get a URL-friendly slug for a state
 * @param {string} stateCode - Two-letter state code
 * @returns {string} URL-friendly slug
 */
export function getStateSlug(stateCode) {
  const stateName = getStateFullName(stateCode);
  return stateName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Get the readable specialty name from a specialty code
 * @param {string} specialtyCode - NUCC taxonomy code
 * @returns {string} Human-readable specialty name or the original code if not found
 */
export function getSpecialtyFullName(specialtyCode) {
  return specialtyMappings[specialtyCode] || specialtyCode;
}

/**
 * Get a URL-friendly slug for a specialty
 * @param {string} specialtyCode - NUCC taxonomy code
 * @returns {string} URL-friendly slug
 */
export function getSpecialtySlug(specialtyCode) {
  return specialtySlugs[specialtyCode] || specialtyCode.toLowerCase();
}

/**
 * Get related specialties for a given specialty code
 * @param {string} specialtyCode - NUCC taxonomy code
 * @returns {Array} Array of related specialty objects with code, name, count, and slug
 */
export function getRelatedSpecialties(specialtyCode) {
  return relatedSpecialtiesMap[specialtyCode] || [];
}

/**
 * Get estimated provider count for a state/specialty combination
 * This would be replaced by an actual API call or database lookup in production
 * @param {string} stateCode - Two-letter state code
 * @param {string} specialtyCode - NUCC taxonomy code
 * @returns {number} Estimated provider count
 */
export function getEstimatedProviderCount(stateCode, specialtyCode) {
  // This is a placeholder function - in production, this would call an API
  // or use a pre-generated lookup table of provider counts
  const counts = {
    'TX_207RC0000X': 2100, // Texas Cardiology
    'CA_207RC0000X': 3200, // California Cardiology
    'NY_207RC0000X': 2800, // New York Cardiology
    // Add more combinations as needed
  };
  
  const key = `${stateCode}_${specialtyCode}`;
  return counts[key] || 500; // Default count if not found
}

/**
 * Get the specialty code from a URL slug
 * @param {string} slug - The URL-friendly specialty slug (e.g., 'cardiology')
 * @returns {string|null} The specialty code or null if not found
 */
export function getSpecialtyCodeFromSlug(slug) {
  const normalizedSlug = slug.toLowerCase().trim();
  for (const [code, slugValue] of Object.entries(specialtySlugs)) {
    if (slugValue === normalizedSlug) {
      return code;
    }
  }
  return null;
} 