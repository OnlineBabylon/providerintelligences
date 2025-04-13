import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  ArrowLongRightIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const TexasCardiology = () => {
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
  
  useEffect(() => {
    setIsVisible(true);
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          `https://docapi-uax3j.ondigitalocean.app/api/providers/search?state=TX&specialty=207RC0000X&limit=${providersPerPage}&page=${currentPage}`
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
        console.error('Error fetching providers:', err);
        setError('Failed to load providers. Please try again later.');
        setLoading(false);
      }
    };

    fetchProviders();
  }, [currentPage]);

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
        <title>Texas Cardiology Providers | Provider Intelligences</title>
        <meta 
          name="description" 
          content="Access a comprehensive database of Texas cardiology providers to supercharge your healthcare sales and marketing efforts. Connect with cardiology decision-makers today." 
        />
        <link rel="canonical" href="https://yourdomain.com/texas/cardiology" />
      </Helmet>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Texas Cardiology Providers Database</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build targeted outreach campaigns to 2,100+ cardiology providers across Texas with our verified contact database.
          </p>
        </div>
      </div>

      {/* B2B Value Proposition */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Elevate Your Healthcare Sales Strategy</h2>
        <p className="mb-4">
          Our Texas cardiology database gives sales teams direct access to decision-makers in cardiovascular practices statewide. 
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
      </div>

      {/* Database Preview */}
      <div className="px-2 lg:px-4 pb-8">
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
                      Showing <span className="font-bold">{providers.length}</span> of <span className="font-bold">{totalCount}</span> cardiology providers in Texas
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
                                <div className="text-xs text-gray-500 mt-1">Cardiology</div>
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
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${
                          currentPage === 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md`}
                      >
                        Previous
                      </button>
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`${
                          currentPage === totalPages 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        } ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md`}
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{(currentPage - 1) * providersPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * providersPerPage, totalCount)}</span> of <span className="font-medium">{totalCount}</span> providers
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`${
                              currentPage === 1 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                            } relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium`}
                          >
                            Previous
                          </button>
                          
                          {/* First page */}
                          {currentPage > 2 && (
                            <button
                              onClick={() => handlePageChange(1)}
                              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                              1
                            </button>
                          )}
                          
                          {/* Ellipsis */}
                          {currentPage > 3 && (
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              ...
                            </span>
                          )}
                          
                          {/* Previous page */}
                          {currentPage > 1 && (
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                              {currentPage - 1}
                            </button>
                          )}
                          
                          {/* Current page */}
                          <button
                            className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                          >
                            {currentPage}
                          </button>
                          
                          {/* Next page */}
                          {currentPage < totalPages && (
                            <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                              {currentPage + 1}
                            </button>
                          )}
                          
                          {/* Ellipsis */}
                          {currentPage < totalPages - 2 && (
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              ...
                            </span>
                          )}
                          
                          {/* Last page */}
                          {currentPage < totalPages - 1 && totalPages > 1 && (
                            <button
                              onClick={() => handlePageChange(totalPages)}
                              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                              {totalPages}
                            </button>
                          )}
                          
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`${
                              currentPage === totalPages 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                            } relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium`}
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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
                    ? 'Access verified email addresses for all Texas cardiology providers.'
                    : 'Download the complete Texas cardiology provider database in CSV format.'}
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
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Why Partner With Texas Cardiology Providers?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Market Size & Opportunity</h3>
            <p className="mb-4">
              Texas has over 2,100 cardiology providers managing the care of millions of patients with cardiovascular conditions. This represents a significant market for medical devices, pharmaceuticals, and healthcare services.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> 
                <span>High-value practices with substantial purchasing authority</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span> 
                <span>Decision-makers for cardiac diagnostics, interventional devices, and pharmaceuticals</span>
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
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center my-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Accelerate Your Healthcare Sales?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Get complete access to our Texas cardiology provider database and start connecting with decision-makers today.
        </p>
        <button 
          onClick={(e) => handleDownloadClick(e, 'download')}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
        >
          Download Complete Provider List
        </button>
      </div>

      {/* Related Specialties Section */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Related Healthcare Specialties in Texas</h2>
        <p className="mb-4 text-gray-700">
          Expand your sales opportunities with access to other high-value healthcare specialties:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/texas/internal-medicine" className="text-blue-600 hover:underline">Internal Medicine (6,800+ providers)</Link>
          <Link to="/texas/family-medicine" className="text-blue-600 hover:underline">Family Medicine (9,200+ providers)</Link>
          <Link to="/texas/interventional-cardiology" className="text-blue-600 hover:underline">Interventional Cardiology (540+ providers)</Link>
          <Link to="/texas/cardiac-surgery" className="text-blue-600 hover:underline">Cardiac Surgery (320+ providers)</Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
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
            <p className="mt-1 text-gray-700">Our data can be exported to various CRM systems or used directly for targeted email campaigns, direct mail, territory planning, and account-based marketing strategies focused on cardiology practices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TexasCardiology; 