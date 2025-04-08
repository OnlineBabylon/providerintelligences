import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  ArrowLongRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const specialties = [
  "Allergy & Immunology",
  "Anesthesiology",
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "General Surgery",
  "Geriatric Medicine",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Medical Genetics",
  "Nephrology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedic Surgery",
  "Otolaryngology",
  "Pathology",
  "Pediatrics",
  "Physical Medicine",
  "Plastic Surgery",
  "Psychiatry",
  "Pulmonology",
  "Radiation Oncology",
  "Radiology",
  "Rheumatology",
  "Sports Medicine",
  "Thoracic Surgery",
  "Urology",
  "Vascular Surgery"
];

const locations = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const generateDefaultHospitals = (state) => [
  `${state} General Hospital`,
  `${state} Medical Center`,
  `${state} Memorial Hospital`,
  `${state} Regional Medical`,
  `${state} University Hospital`,
  `${state} Children's Hospital`,
  `${state} Presbyterian`,
  `${state} Methodist Hospital`,
  `${state} Baptist Medical`,
  `${state} Community Hospital`
];

const hospitals = {
  "AL": generateDefaultHospitals("Alabama"),
  "AK": generateDefaultHospitals("Alaska"),
  "AZ": ["Mayo Clinic AZ", "Banner University", "St. Joseph's", "Phoenix Children's", "HonorHealth", "Dignity Health", "Banner Desert", "Tucson Medical", "Banner Gateway", "Mercy Gilbert"],
  "AR": generateDefaultHospitals("Arkansas"),
  "CA": ["UCLA Medical Center", "Cedars-Sinai", "USC Medical Center", "Providence Saint John's", "Good Samaritan", "Children's Hospital LA", "Kaiser Permanente", "Ronald Reagan", "City of Hope", "Beverly Hills Medical"],
  "CO": ["UC Health", "Denver Health", "Children's Colorado", "Porter Adventist", "Swedish Medical CO", "Rose Medical", "Presbyterian St. Luke's", "Sky Ridge", "Lutheran Medical", "Medical Center of Aurora"],
  "CT": generateDefaultHospitals("Connecticut"),
  "DE": generateDefaultHospitals("Delaware"),
  "FL": ["Jackson Memorial", "UF Health Shands", "Tampa General", "Mayo Clinic FL", "Cleveland Clinic FL", "Orlando Health", "Baptist Health", "Nicklaus Children's", "Mount Sinai Miami", "Memorial Regional"],
  "GA": generateDefaultHospitals("Georgia"),
  "HI": generateDefaultHospitals("Hawaii"),
  "ID": generateDefaultHospitals("Idaho"),
  "IL": ["Northwestern Memorial", "Rush University", "University of Chicago", "Lurie Children's", "Illinois Masonic", "University of Illinois", "Advocate Christ", "Rush Oak Park", "Swedish Covenant", "Saint Joseph"],
  "IN": generateDefaultHospitals("Indiana"),
  "IA": generateDefaultHospitals("Iowa"),
  "KS": generateDefaultHospitals("Kansas"),
  "KY": generateDefaultHospitals("Kentucky"),
  "LA": generateDefaultHospitals("Louisiana"),
  "ME": generateDefaultHospitals("Maine"),
  "MD": generateDefaultHospitals("Maryland"),
  "MA": ["Mass General", "Brigham and Women's", "Boston Children's", "Beth Israel Deaconess", "Tufts Medical", "Boston Medical Center", "Dana-Farber", "Newton-Wellesley", "Mount Auburn", "St. Elizabeth's"],
  "MI": generateDefaultHospitals("Michigan"),
  "MN": generateDefaultHospitals("Minnesota"),
  "MS": generateDefaultHospitals("Mississippi"),
  "MO": generateDefaultHospitals("Missouri"),
  "MT": generateDefaultHospitals("Montana"),
  "NE": generateDefaultHospitals("Nebraska"),
  "NV": generateDefaultHospitals("Nevada"),
  "NH": generateDefaultHospitals("New Hampshire"),
  "NJ": generateDefaultHospitals("New Jersey"),
  "NM": generateDefaultHospitals("New Mexico"),
  "NY": ["Mount Sinai", "NewYork-Presbyterian", "Columbia Presbyterian", "NYU Langone", "Memorial Sloan Kettering", "Hospital for Special Surgery", "Lenox Hill", "Bellevue", "Beth Israel", "Weill Cornell"],
  "NC": generateDefaultHospitals("North Carolina"),
  "ND": generateDefaultHospitals("North Dakota"),
  "OH": generateDefaultHospitals("Ohio"),
  "OK": generateDefaultHospitals("Oklahoma"),
  "OR": generateDefaultHospitals("Oregon"),
  "PA": generateDefaultHospitals("Pennsylvania"),
  "RI": generateDefaultHospitals("Rhode Island"),
  "SC": generateDefaultHospitals("South Carolina"),
  "SD": generateDefaultHospitals("South Dakota"),
  "TN": generateDefaultHospitals("Tennessee"),
  "TX": ["Texas Medical Center", "Houston Methodist", "Memorial Hermann", "MD Anderson", "Baylor St. Luke's", "Texas Children's", "Houston Presbyterian", "Park Plaza Hospital", "HCA Houston", "Memorial City"],
  "UT": generateDefaultHospitals("Utah"),
  "VT": generateDefaultHospitals("Vermont"),
  "VA": generateDefaultHospitals("Virginia"),
  "WA": ["UW Medical Center", "Swedish Medical", "Virginia Mason", "Harborview", "Seattle Children's", "Providence", "MultiCare", "Overlake", "EvergreenHealth", "Valley Medical"],
  "WV": generateDefaultHospitals("West Virginia"),
  "WI": generateDefaultHospitals("Wisconsin"),
  "WY": generateDefaultHospitals("Wyoming")
};

const generateMoreProviders = (specialty, color, locations) => {
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Susan", "Richard", "Jessica", "Joseph", "Sarah", "Thomas", "Karen", "Charles", "Nancy"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

  const areaCodeMap = {
    "NY": "212", "CA": "310", "FL": "305", "IL": "312", "TX": "713",
    "MA": "617", "WA": "206", "AZ": "602", "CO": "303", "PA": "215",
    "OH": "216", "MI": "313", "GA": "404", "NC": "919", "NJ": "201",
    "VA": "703", "TN": "615", "MO": "314", "WI": "414", "MD": "301",
    "MN": "612", "IN": "317", "LA": "504", "OR": "503", "KY": "502",
    "OK": "405", "CT": "203", "UT": "801", "NV": "702", "NM": "505",
    "KS": "316", "MS": "601", "AR": "501", "IA": "515", "SC": "803",
    "AL": "205", "NE": "402", "ID": "208", "HI": "808", "ME": "207",
    "NH": "603", "RI": "401", "MT": "406", "DE": "302", "SD": "605",
    "AK": "907", "ND": "701", "VT": "802", "DC": "202", "WV": "304",
    "WY": "307"
  };

  return locations.flatMap((location) => {
    const hospitalList = hospitals[location] || generateDefaultHospitals(location);
    return hospitalList.map((hospital, hIndex) => {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      return {
        id: `${specialty}-${location}-${hIndex}`,
        name: `Dr. ${firstName} ${lastName}, MD`,
        specialty: specialty,
        specialtyColor: color,
        location: location,
        hospital: hospital,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${hospital.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`,
        phone: `(${areaCodeMap[location] || "555"}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`
      };
    });
  });
};

const sampleData = [
  ...generateMoreProviders("Cardiology", "red", locations),
  ...generateMoreProviders("Internal Medicine", "blue", locations),
  ...generateMoreProviders("Family Medicine", "green", locations),
  ...generateMoreProviders("Neurology", "purple", locations),
  ...generateMoreProviders("Orthopedic Surgery", "orange", locations),
  ...generateMoreProviders("Pediatrics", "emerald", locations),
  ...generateMoreProviders("Obstetrics & Gynecology", "pink", locations),
  ...generateMoreProviders("Psychiatry", "indigo", locations),
  ...generateMoreProviders("Dermatology", "rose", locations),
  ...generateMoreProviders("Emergency Medicine", "amber", locations)
];

// Add filter configurations
const filterConfig = {
  enumeration_type: {
    label: "Provider Type",
    options: [
      { value: "NPI-1", label: "Individual Provider (NPI-1)" },
      { value: "NPI-2", label: "Organization (NPI-2)" }
    ]
  },
  name_purpose: {
    label: "Name Type",
    options: [
      { value: "PROVIDER", label: "Provider Name" },
      { value: "AO", label: "Administrative Official" }
    ]
  },
  address_purpose: {
    label: "Address Type",
    options: [
      { value: "LOCATION", label: "Practice Location" },
      { value: "MAILING", label: "Mailing Address" },
      { value: "PRIMARY", label: "Primary Address" },
      { value: "SECONDARY", label: "Secondary Address" }
    ]
  }
};

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [specialtyDropdownOpen, setSpecialtyDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [activeSpecialties] = useState([
    "Cardiology",
    "Internal Medicine",
    "Family Medicine",
    "Neurology",
    "Orthopedic Surgery"
  ]);
  
  const [activeLocations] = useState([
    "NY", "CA", "TX", "FL", "IL", "MA", "PA", "OH"
  ]);

  const [filters, setFilters] = useState({
    enumeration_type: "NPI-1",
    taxonomy_description: "",
    name_purpose: "PROVIDER",
    first_name: "",
    last_name: "",
    organization_name: "",
    address_purpose: "LOCATION",
    city: "",
    state: "",
    postal_code: "",
    country_code: "US"
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [providerTypeDropdownOpen, setProviderTypeDropdownOpen] = useState(false);
  const [addressTypeDropdownOpen, setAddressTypeDropdownOpen] = useState(false);
  const [nameTypeDropdownOpen, setNameTypeDropdownOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setIsVisible(true);
    
    // Filter data based on active filters
    const filteredData = sampleData.filter(provider => 
      activeSpecialties.includes(provider.specialty) &&
      activeLocations.includes(provider.location)
    );

    // Get an even distribution of specialties and locations
    const balancedData = [];
    const providersPerSpecialty = 2; // Show 2 providers per specialty
    const maxProviders = 10; // Show 10 providers total

    // First, get providers for each specialty
    for (const specialty of activeSpecialties) {
      const specialtyProviders = filteredData
        .filter(provider => provider.specialty === specialty)
        .sort(() => Math.random() - 0.5) // Randomize the order
        .slice(0, providersPerSpecialty);
      
      balancedData.push(...specialtyProviders);
    }

    // If we have less than maxProviders, fill with remaining providers
    if (balancedData.length < maxProviders) {
      const remainingProviders = filteredData
        .filter(provider => !balancedData.includes(provider))
        .sort(() => Math.random() - 0.5)
        .slice(0, maxProviders - balancedData.length);
      
      balancedData.push(...remainingProviders);
    }

    // Ensure we have providers from different locations
    const locationCounts = {};
    activeLocations.forEach(location => {
      locationCounts[location] = balancedData.filter(p => p.location === location).length;
    });

    // If any location has no providers, try to add some
    for (const location of activeLocations) {
      if (locationCounts[location] === 0) {
        const locationProviders = filteredData
          .filter(provider => provider.location === location)
          .sort(() => Math.random() - 0.5)
          .slice(0, 1);
        
        if (locationProviders.length > 0) {
          // Replace a random provider from an overrepresented location
          const maxLocationCount = Math.max(...Object.values(locationCounts));
          const overrepresentedLocation = Object.keys(locationCounts)
            .find(loc => locationCounts[loc] === maxLocationCount);
          
          const indexToReplace = balancedData
            .findIndex(p => p.location === overrepresentedLocation);
          
          if (indexToReplace !== -1) {
            balancedData[indexToReplace] = locationProviders[0];
            locationCounts[location]++;
            locationCounts[overrepresentedLocation]--;
          }
        }
      }
    }

    // Sort by specialty and then by location for a clean presentation
    balancedData.sort((a, b) => {
      if (a.specialty === b.specialty) {
        return a.location.localeCompare(b.location);
      }
      return a.specialty.localeCompare(b.specialty);
    });

    setCurrentData(balancedData);
  }, [activeSpecialties, activeLocations]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setSpecialtyDropdownOpen(false);
      setLocationDropdownOpen(false);
      setProviderTypeDropdownOpen(false);
      setAddressTypeDropdownOpen(false);
      setNameTypeDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('https://submit-form.com/CnhTHfFeU', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          source: window.location.href,
          timestamp: new Date().toISOString(),
        }),
      });

      setFormSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderAdvancedFilters = () => (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Provider Type Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provider Type
          </label>
          <button 
            className="w-full inline-flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setProviderTypeDropdownOpen(!providerTypeDropdownOpen);
              setAddressTypeDropdownOpen(false);
              setNameTypeDropdownOpen(false);
            }}
          >
            <span>{filterConfig.enumeration_type.options.find(opt => opt.value === filters.enumeration_type)?.label}</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${providerTypeDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {providerTypeDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-white border-b border-gray-200">
                  Select Provider Type
                </div>
                {filterConfig.enumeration_type.options.map((option) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer ${
                      filters.enumeration_type === option.value
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, enumeration_type: option.value }));
                      setProviderTypeDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Address Type Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Type
          </label>
          <button 
            className="w-full inline-flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setAddressTypeDropdownOpen(!addressTypeDropdownOpen);
              setProviderTypeDropdownOpen(false);
              setNameTypeDropdownOpen(false);
            }}
          >
            <span>{filterConfig.address_purpose.options.find(opt => opt.value === filters.address_purpose)?.label}</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${addressTypeDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {addressTypeDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-white border-b border-gray-200">
                  Select Address Type
                </div>
                {filterConfig.address_purpose.options.map((option) => (
                  <div
                    key={option.value}
                    className={`px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer ${
                      filters.address_purpose === option.value
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, address_purpose: option.value }));
                      setAddressTypeDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Name Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provider Name
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="First Name"
              className="rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
              value={filters.first_name}
              onChange={(e) => setFilters(prev => ({ ...prev, first_name: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
              value={filters.last_name}
              onChange={(e) => setFilters(prev => ({ ...prev, last_name: e.target.value }))}
            />
          </div>
        </div>

        {/* Organization Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name
          </label>
          <input
            type="text"
            placeholder="Organization Name"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
            value={filters.organization_name}
            onChange={(e) => setFilters(prev => ({ ...prev, organization_name: e.target.value }))}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            placeholder="Enter city name"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
            value={filters.city}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            placeholder="Enter ZIP code"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
            value={filters.postal_code}
            onChange={(e) => setFilters(prev => ({ ...prev, postal_code: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );

  const scrollToEmailForm = () => {
    const emailSection = document.querySelector('#email-section');
    emailSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🏥</span>
              <span className="text-xl font-semibold">Medical Provider Leads</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={scrollToEmailForm}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-8 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-6xl md:text-[85px] font-bold tracking-tight text-gray-900 leading-tight mb-8">
            Find healthcare
            <br />
            providers now
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            Access <span className="underline decoration-[#86efac] decoration-2">9M+ verified providers</span> with complete <span className="underline decoration-[#86efac] decoration-2">contact information</span> and <span className="underline decoration-[#86efac] decoration-2">practice details</span> to accelerate your healthcare sales.
          </p>
          
          {/* Trusted By Section - Moved here */}
          <div className="mb-16">
            <p className="text-sm text-gray-600 mb-8">
              Trusted by leading healthcare sales teams at:
            </p>
            <div className="relative overflow-hidden w-full">
              <div className="flex space-x-12 animate-scroll">
                <div className="flex space-x-12 items-center min-w-full">
                  <img 
                    src="/logos/McKesson/McKesson_id-AlQSdCe_0.svg"
                    alt="McKesson" 
                    className="h-8 opacity-90"
                  />
                  <img 
                    src="/logos/Cardinal Health/Cardinal Health_idxnriHfOz_0.svg"
                    alt="Cardinal Health" 
                    className="h-8 opacity-90"
                  />
                  <img 
                    src="/logos/Siemens/Siemens_id9pN9eCSO_0.svg"
                    alt="Siemens" 
                    className="h-8 opacity-90"
                  />
                  <img 
                    src="/logos/idW8NkNyXX_logos.png"
                    alt="Healthcare Partners" 
                    className="h-8 opacity-90 object-contain"
                  />
                </div>
                <div className="flex space-x-12 items-center min-w-full">
                  <img 
                    src="/logos/McKesson/McKesson_id-AlQSdCe_0.svg"
                    alt="McKesson" 
                    className="h-8 opacity-90"
                  />
                  <img 
                    src="/logos/Cardinal Health/Cardinal Health_idxnriHfOz_0.svg"
                    alt="Cardinal Health" 
                    className="h-8 opacity-90"
                  />
                  <img 
                    src="/logos/Siemens/Siemens_id9pN9eCSO_0.svg"
                    alt="Siemens" 
                    className="h-8 opacity-90"
                  />
                  <img 
                    src="/logos/idW8NkNyXX_logos.png"
                    alt="Healthcare Partners" 
                    className="h-8 opacity-90 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Preview */}
      <div className="px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
              {/* Filters */}
              <div className="border-b border-gray-200 bg-gray-50 p-4">
                {/* Primary Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  {/* Specialty Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialty
                    </label>
                    <button 
                      className="w-full inline-flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpecialtyDropdownOpen(!specialtyDropdownOpen);
                        setLocationDropdownOpen(false);
                      }}
                    >
                      <span>Select Specialties</span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${specialtyDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {specialtyDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto">
                        <div className="p-2">
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-white border-b border-gray-200">
                            Medical Specialties
                          </div>
                          {specialties.map((specialty) => (
                            <div
                              key={specialty}
                              className={`px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-not-allowed ${
                                activeSpecialties.includes(specialty) 
                                  ? 'bg-blue-50 text-blue-700' 
                                  : 'text-gray-700 opacity-50'
                              }`}
                            >
                              {specialty}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Location Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <button 
                      className="w-full inline-flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocationDropdownOpen(!locationDropdownOpen);
                        setSpecialtyDropdownOpen(false);
                      }}
                    >
                      <span>Select States</span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {locationDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto">
                        <div className="p-2">
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-white border-b border-gray-200">
                            States
                          </div>
                          {locations.map((location) => (
                            <div
                              key={location}
                              className={`px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-not-allowed ${
                                activeLocations.includes(location) 
                                  ? 'bg-green-50 text-green-700' 
                                  : 'text-gray-700 opacity-50'
                              }`}
                            >
                              {location}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Provider Type */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provider Type
                    </label>
                    <button 
                      className="w-full inline-flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProviderTypeDropdownOpen(!providerTypeDropdownOpen);
                      }}
                    >
                      <span>{filterConfig.enumeration_type.options.find(opt => opt.value === filters.enumeration_type)?.label}</span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${providerTypeDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {providerTypeDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                        <div className="p-2">
                          {filterConfig.enumeration_type.options.map((option) => (
                            <div
                              key={option.value}
                              className={`px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer ${
                                filters.enumeration_type === option.value
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'text-gray-700'
                              }`}
                              onClick={() => {
                                setFilters(prev => ({ ...prev, enumeration_type: option.value }));
                                setProviderTypeDropdownOpen(false);
                              }}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Address Type */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Type
                    </label>
                    <button 
                      className="w-full inline-flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddressTypeDropdownOpen(!addressTypeDropdownOpen);
                      }}
                    >
                      <span>{filterConfig.address_purpose.options.find(opt => opt.value === filters.address_purpose)?.label}</span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${addressTypeDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {addressTypeDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                        <div className="p-2">
                          {filterConfig.address_purpose.options.map((option) => (
                            <div
                              key={option.value}
                              className={`px-4 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer ${
                                filters.address_purpose === option.value
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'text-gray-700'
                              }`}
                              onClick={() => {
                                setFilters(prev => ({ ...prev, address_purpose: option.value }));
                                setAddressTypeDropdownOpen(false);
                              }}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Secondary Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Provider Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provider Name
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
                        value={filters.first_name}
                        onChange={(e) => setFilters(prev => ({ ...prev, first_name: e.target.value }))}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
                        value={filters.last_name}
                        onChange={(e) => setFilters(prev => ({ ...prev, last_name: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Organization Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="Organization Name"
                      className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
                      value={filters.organization_name}
                      onChange={(e) => setFilters(prev => ({ ...prev, organization_name: e.target.value }))}
                    />
                  </div>

                  {/* Location Details */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Enter city"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
                        value={filters.city}
                        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter ZIP"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm bg-white"
                        value={filters.postal_code}
                        onChange={(e) => setFilters(prev => ({ ...prev, postal_code: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Active Filter Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeSpecialties.map((specialty) => (
                    <span key={specialty} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {specialty}
                    </span>
                  ))}
                  {activeLocations.map((location) => (
                    <span key={location} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {location}
                    </span>
                  ))}
                  {Object.entries(filters).map(([key, value]) => {
                    if (value && value !== "US" && key !== "enumeration_type") {
                      const label = filterConfig[key]?.options?.find(opt => opt.value === value)?.label || value;
                      return (
                        <span key={key} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {label}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Provider Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specialty
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentData.map((provider) => (
                      <tr key={provider.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {provider.specialty}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{provider.hospital}</div>
                          <div className="text-sm text-gray-500">{provider.location}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-blue-600">{provider.email}</div>
                          <div className="text-sm text-gray-500">{provider.phone}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">10</span> of <span className="font-medium">9,000+</span> providers
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Page {currentPage} of 900
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Signup & CTA */}
      <div id="email-section" className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {formSubmitted ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Medical Provider Leads!
              </h2>
              <p className="text-xl text-gray-600">
                We're preparing your access to 9M+ healthcare providers. Check your email for next steps.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Access 9M+ Healthcare Provider Contacts
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Start your free 30-day trial to unlock verified emails, phone numbers, and practice details of healthcare providers across all 50 states.
              </p>
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your work email"
                    className="flex-1 rounded-lg border border-gray-300 px-6 py-4 text-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${
                      submitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors whitespace-nowrap flex items-center justify-center min-w-[160px] shadow-sm`}
                  >
                    {submitting ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      'Start Free Trial'
                    )}
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-16">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant Access
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No Credit Card
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel Anytime
                </span>
              </div>

              <div className="grid grid-cols-3 gap-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">9M+</div>
                  <div className="text-gray-600">Verified Providers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">50</div>
                  <div className="text-gray-600">States Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">34+</div>
                  <div className="text-gray-600">Specialties</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Medical Provider Leads. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Remove the old Trusted By section from the bottom */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage; 