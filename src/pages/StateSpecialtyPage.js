import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLongRightIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

// Data mapping utilities
import { 
  getStateFullName, 
  getSpecialtyFullName, 
  getStateSlug,
  getSpecialtySlug,
  getSpecialtyCodeFromSlug
} from '../utils/dataMappings';

const StateSpecialtyPage = () => {
  const { state, specialty } = useParams();
  const navigate = useNavigate();
  
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedProviderNpi, setSelectedProviderNpi] = useState(null);
  const [actionType, setActionType] = useState('');
  const providersPerPage = 10;
  
  // Derived state data
  const stateCode = state.toUpperCase(); // Convert from path param to state code
  
  // Convert specialty slug to specialty code
  const specialtyCode = getSpecialtyCodeFromSlug(specialty) || specialty;
  
  const stateName = getStateFullName(stateCode);
  const stateSlug = getStateSlug(stateCode);
  const specialtyName = getSpecialtyFullName(specialtyCode);
  const specialtySlug = getSpecialtySlug(specialtyCode);
  
  // If specialty not found, redirect to error page
  useEffect(() => {
    if (!specialtyCode) {
      navigate('/error');
    }
  }, [specialtyCode, navigate]);
  
  useEffect(() => {
    setIsVisible(true);
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          `https://docapi-uax3j.ondigitalocean.app/api/providers/search?state=${stateCode}&specialty=${specialtyCode}&limit=${providersPerPage}&page=${currentPage}`
        );
        
        if (response.data && response.data.providers) {
          setProviders(response.data.providers || []);
          setTotalCount(response.data.total || 0);
        } else {
          setProviders([]);
          setTotalCount(0);
        }
        
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching providers for ${stateName} ${specialtyName}:`, err);
        setError('Failed to load providers. Please try again later.');
        setLoading(false);
      }
    };

    if (specialtyCode) {
      fetchProviders();
    }
  }, [currentPage, stateCode, specialtyCode, stateName, specialtyName]);

  const totalPages = Math.ceil(totalCount / providersPerPage);
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setLoading(true);
    }
  };

  const handleDownloadClick = (e, type = 'download') => {
    e.preventDefault();
    setActionType(type);
    setShowEmailForm(true);
  };

  const handleViewDetailsClick = (e, npi) => {
    e.preventDefault();
    setSelectedProviderNpi(npi);
    setActionType('view');
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Submit to Formspark
      await axios.post('https://submit-form.com/CnhTHfFeU', {
        email,
        action_type: actionType,
        provider_npi: selectedProviderNpi || 'bulk',
        source: window.location.href,
        timestamp: new Date().toISOString(),
        state: stateCode,
        specialty: specialtyCode,
      });
      
      setFormSubmitted(true);
      
      // Handle different actions based on type
      setTimeout(() => {
        if (actionType === 'view' && selectedProviderNpi) {
          // Redirect to provider details page
          window.location.href = `/providers/${selectedProviderNpi}`;
        } else {
          // Redirect to pricing page for downloads
          window.location.href = '/pricing';
        }
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error but still redirect
      setTimeout(() => {
        if (actionType === 'view' && selectedProviderNpi) {
          window.location.href = `/providers/${selectedProviderNpi}`;
        } else {
          window.location.href = '/pricing';
        }
      }, 1000);
    }
  };

  // Generate a pseudo-email for providers based on their name and NPI
  const generatePseudoEmail = (provider) => {
    if (provider.first_name && provider.last_name) {
      return `${provider.first_name.toLowerCase()}.${provider.last_name.toLowerCase()}@practice.com`;
    } else if (provider.organization_name) {
      return `contact@${provider.organization_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`;
    } else {
      return `contact-${provider.npi}@provider.com`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{`${specialtyName} Providers in ${stateName} | Provider Intelligences`}</title>
        <meta 
          name="description" 
          content={`Access a comprehensive database of ${totalCount.toLocaleString()}+ verified ${stateName} ${specialtyName.toLowerCase()} providers. Get emails, phone numbers and contact details for healthcare marketing and sales outreach.`} 
        />
        <meta 
          name="keywords" 
          content={`${specialtyName}, ${stateName} healthcare providers, ${specialtyName.toLowerCase()} contact information, medical provider database, healthcare sales outreach`}
        />
        <link rel="canonical" href={`https://providerintelligences.com/${stateSlug}/${specialtySlug}`} />
        <meta property="og:title" content={`${specialtyName} Providers in ${stateName} | Provider Intelligences`} />
        <meta 
          property="og:description" 
          content={`Access a comprehensive database of ${stateName} ${specialtyName.toLowerCase()} providers to supercharge your healthcare sales and marketing efforts.`} 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://providerintelligences.com/${stateSlug}/${specialtySlug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${specialtyName} Providers in ${stateName} | Provider Intelligences`} />
        <meta 
          name="twitter:description" 
          content={`Access a comprehensive database of ${stateName} ${specialtyName.toLowerCase()} providers to supercharge your healthcare sales and marketing efforts.`} 
        />
        {/* Structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DataCatalog",
            "name": `${stateName} ${specialtyName} Providers Database`,
            "description": `Comprehensive database of ${totalCount.toLocaleString()}+ verified ${specialtyName.toLowerCase()} providers in ${stateName}`,
            "keywords": `${specialtyName}, ${stateName} healthcare, medical provider database`,
            "url": `https://providerintelligences.com/${stateSlug}/${specialtySlug}`,
            "provider": {
              "@type": "Organization",
              "name": "Provider Intelligences",
              "url": "https://providerintelligences.com"
            },
            "dataset": {
              "@type": "Dataset",
              "name": `${stateName} ${specialtyName} Provider Directory`,
              "description": `Contact information and practice details for ${specialtyName.toLowerCase()} providers in ${stateName}`,
              "keywords": `${specialtyName.toLowerCase()}, ${stateName.toLowerCase()}, healthcare providers, medical contacts`,
              "includedInDataCatalog": {
                "@type": "DataCatalog",
                "name": "Healthcare Provider Intelligence Platform"
              },
              "distribution": {
                "@type": "DataDownload",
                "contentUrl": `https://providerintelligences.com/api/download/${stateSlug}/${specialtySlug}`,
                "encodingFormat": "CSV"
              }
            }
          })}
        </script>
      </Helmet>

      <main>
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{stateName} {specialtyName} Providers Database</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build targeted outreach campaigns to {totalCount.toLocaleString()}+ {specialtyName.toLowerCase()} providers across {stateName} with our verified contact database.
            </p>
          </div>
        </div>

        {/* B2B Value Proposition */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Elevate Your Healthcare Sales Strategy</h2>
          <p className="mb-4">
            Our {stateName} {specialtyName.toLowerCase()} database gives sales teams direct access to decision-makers in {specialtyName.toLowerCase()} practices statewide. 
            Connect with providers who influence purchasing decisions for medical devices, pharmaceuticals, and healthcare services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-bold text-lg mb-2">Complete Provider Profiles</h3>
              <p>Access verified contact details, practice information, and Medicare participation status to qualify leads efficiently.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-bold text-lg mb-2">Market Intelligence</h3>
              <p>Understand practice affiliations and referral networks to identify key stakeholders in purchasing decisions.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-bold text-lg mb-2">Segmentation Ready</h3>
              <p>Filter by location, organization type, and practice size to build targeted outreach campaigns that convert.</p>
            </div>
          </div>
        </section>

        {/* Database Preview */}
        <section className="px-2 lg:px-4 pb-8">
          <div className="mx-auto max-w-7xl">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                
                {/* Results Table */}
                {loading ? (
                  <div className="text-center py-10">
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                      <div className="h-64 bg-gray-200 rounded-lg max-w-4xl mx-auto"></div>
                    </div>
                    <p className="text-lg mt-6">Loading providers...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                    <p>{error}</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                      <p className="font-medium text-gray-700">
                        Showing <span className="font-bold">{providers.length}</span> of <span className="font-bold">{totalCount}</span> {specialtyName.toLowerCase()} providers in {stateName}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          Data updated daily from verified healthcare sources
                        </div>
                        <button 
                          onClick={(e) => handleDownloadClick(e, 'download')}
                          className="inline-flex items-center px-4 py-2 border border-blue-600 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                          Download to CSV
                        </button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Provider Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Address
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {providers.length > 0 ? (
                            providers.map((provider) => (
                              <tr key={provider.npi} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {provider.first_name && provider.last_name ? 
                                      `${provider.first_name} ${provider.last_name}` : 
                                      provider.organization_name}
                                  </div>
                                  <div className="text-xs text-gray-500">NPI: {provider.npi}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {provider.provider_type === "1" ? "Individual" : "Organization"}
                                  </span>
                                  <div className="text-xs text-gray-500 mt-1">{specialtyName}</div>
                                </td>
                                <td className="px-6 py-4">
                                  {provider.address && (
                                    <>
                                      <div className="text-sm text-gray-900">{provider.address.line1}</div>
                                      {provider.address.line2 && <div className="text-sm text-gray-500">{provider.address.line2}</div>}
                                      <div className="text-sm text-gray-500">
                                        {provider.address.city}, {provider.address.state} {provider.address.postal_code}
                                      </div>
                                    </>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {provider.phone && (
                                    <div className="text-sm text-gray-500">
                                      {provider.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-500 filter blur-sm transition-all">
                                    {generatePseudoEmail(provider)}
                                  </div>
                                  <div className="text-xs text-blue-600 mt-1">
                                    <button 
                                      onClick={(e) => handleDownloadClick(e, 'email')}
                                      className="hover:underline"
                                    >
                                      Unlock Email
                                    </button>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                  <button
                                    onClick={(e) => handleViewDetailsClick(e, provider.npi)}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                  >
                                    View Details
                                    <ArrowLongRightIcon className="h-4 w-4 ml-1" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                No providers found matching your criteria.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-gray-700">
                              Showing <span className="font-medium">{(currentPage - 1) * providersPerPage + 1}</span> to{' '}
                              <span className="font-medium">
                                {Math.min(currentPage * providersPerPage, totalCount)}
                              </span>{' '}
                              of <span className="font-medium">{totalCount}</span> results
                            </p>
                          </div>
                          <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                              <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`${
                                  currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                                } relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium`}
                              >
                                Previous
                              </button>
                              
                              {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                const isCurrentPage = pageNum === currentPage;
                                
                                // Show limited page numbers with ellipsis
                                if (
                                  pageNum <= 3 ||
                                  pageNum > totalPages - 3 ||
                                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                  return (
                                    <button
                                      key={pageNum}
                                      onClick={() => handlePageChange(pageNum)}
                                      className={`${
                                        isCurrentPage
                                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                    >
                                      {pageNum}
                                    </button>
                                  );
                                } else if (
                                  (pageNum === 4 && currentPage > 5) ||
                                  (pageNum === totalPages - 3 && currentPage < totalPages - 4)
                                ) {
                                  return (
                                    <span
                                      key={pageNum}
                                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                    >
                                      ...
                                    </span>
                                  );
                                }
                                
                                return null;
                              })}
                              
                              <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`${
                                  currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                                } relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium`}
                              >
                                Next
                              </button>
                            </nav>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Email Collection Modal */}
        {showEmailForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowEmailForm(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">
                  {actionType === 'view' 
                    ? 'Access Provider Details' 
                    : actionType === 'email' 
                      ? 'Unlock Provider Email' 
                      : 'Download Provider Database'}
                </h3>
                <p className="text-gray-600 mt-2">
                  {actionType === 'view'
                    ? 'Get complete access to this provider\'s detailed profile.'
                    : actionType === 'email'
                      ? `Access verified email addresses for all ${stateName} ${specialtyName.toLowerCase()} providers.`
                      : `Download the complete ${stateName} ${specialtyName.toLowerCase()} provider database in CSV format.`}
                </p>
              </div>
              
              {formSubmitted ? (
                <div className="text-center py-6">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    {actionType === 'view' 
                      ? 'You will now be redirected to the provider details page.'
                      : actionType === 'email'
                        ? 'You will now be redirected to access the provider email addresses.'
                        : 'You will now be redirected to download the provider database.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input type="hidden" name="action_type" value={actionType} />
                  <input type="hidden" name="provider_npi" value={selectedProviderNpi || 'bulk'} />
                  <input type="hidden" name="source" value={window.location.href} />
                  <input type="hidden" name="timestamp" value={new Date().toISOString()} />
                  <input type="hidden" name="state" value={stateCode} />
                  <input type="hidden" name="specialty" value={specialtyCode} />
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full ${
                        submitting 
                          ? 'bg-blue-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center`}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        actionType === 'view' 
                          ? 'Continue to Provider Details' 
                          : actionType === 'email'
                            ? 'Unlock Email Addresses'
                            : 'Download CSV'
                      )}
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4">
                  <span className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Daily Updates
                  </span>
                  <span className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Data
                  </span>
                  <span className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    HIPAA Compliant
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Value Sections */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Why Partner With {stateName} {specialtyName} Providers?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Market Size & Opportunity</h3>
              <p className="mb-4">
                {stateName} has over {totalCount.toLocaleString()} {specialtyName.toLowerCase()} providers managing the care of millions of patients. This represents a significant market for medical devices, pharmaceuticals, and healthcare services.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>High-value practices with substantial purchasing authority</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Decision-makers for medical devices, diagnostics, and pharmaceuticals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Influential in hospital purchasing committees and affiliate networks</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Sales Enablement Made Simple</h3>
              <p className="mb-4">
                Our database accelerates your sales cycle by connecting your team directly with the right stakeholders. Export contact data to your CRM or use our filtering tools to build targeted outreach campaigns.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Ready-to-use contact information for key practice decision-makers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Geographic targeting for efficient territory management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Practice insights to personalize your sales approach</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 rounded-lg p-8 text-center my-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Accelerate Your Healthcare Sales?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Get complete access to our {stateName} {specialtyName.toLowerCase()} provider database and start connecting with decision-makers today.
          </p>
          <button 
            onClick={(e) => handleDownloadClick(e, 'download')}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Download Complete Provider List
          </button>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg">How current is your provider database?</h3>
              <p className="mt-1 text-gray-700">Our database is updated daily with information from NPPES, Medicare, state licensing boards, and other verified healthcare sources to ensure the most current and accurate provider information.</p>
            </div>
            <div>
              <h3 className="font-medium text-lg">Can I filter providers by specific criteria?</h3>
              <p className="mt-1 text-gray-700">Yes, our full database access allows you to filter by geographic location, practice size, hospital affiliations, and Medicare participation status to create highly targeted prospect lists.</p>
            </div>
            <div>
              <h3 className="font-medium text-lg">How can I use this data for my sales outreach?</h3>
              <p className="mt-1 text-gray-700">Our data can be exported to various CRM systems or used directly for targeted email campaigns, direct mail, territory planning, and account-based marketing strategies focused on {specialtyName.toLowerCase()} practices.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StateSpecialtyPage; 