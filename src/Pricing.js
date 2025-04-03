import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handleStartTrial = () => {
    if (!selectedPlan) {
      alert('Please select a plan to continue');
      return;
    }

    // Trigger Google Ads conversion event
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }

    // Simulate an error and redirect to error page
    navigate('/error');
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div 
              className={`flex flex-col items-center text-center p-6 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedPlan === 'starter' 
                  ? 'ring-2 ring-primary-600 bg-primary-50' 
                  : 'hover:ring-2 hover:ring-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedPlan('starter')}
            >
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="flex items-center justify-center gap-x-2">
                  <span className="text-3xl font-bold">$492</span>
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
              </dt>
              <dd className="mt-4 text-base leading-7 text-gray-600">
                100,000 contact exports
              </dd>
            </div>
            <div 
              className={`flex flex-col items-center text-center p-6 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedPlan === 'professional' 
                  ? 'ring-2 ring-primary-600 bg-primary-50' 
                  : 'hover:ring-2 hover:ring-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedPlan('professional')}
            >
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="flex items-center justify-center gap-x-2">
                  <span className="text-3xl font-bold">$769</span>
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
              </dt>
              <dd className="mt-4 text-base leading-7 text-gray-600">
                1,000,000 contact exports
              </dd>
            </div>
            <div 
              className={`flex flex-col items-center text-center p-6 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedPlan === 'enterprise' 
                  ? 'ring-2 ring-primary-600 bg-primary-50' 
                  : 'hover:ring-2 hover:ring-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedPlan('enterprise')}
            >
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="flex items-center justify-center gap-x-2">
                  <span className="text-3xl font-bold">$1.5K</span>
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
              </dt>
              <dd className="mt-4 text-base leading-7 text-gray-600">
                Unlimited contact exports
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <button
            onClick={handleStartTrial}
            className={`rounded-md px-8 py-3 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
              selectedPlan 
                ? 'bg-primary-600 hover:bg-primary-500' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedPlan}
          >
            Start Trial
          </button>
        </div>
      </div>
    </div>
  );
} 