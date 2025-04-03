import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pricing from './Pricing';
import ErrorPage from './ErrorPage';

function HomePage() {
  useEffect(() => {
    // Initialize Tally form
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-center p-6 lg:px-8" aria-label="Global">
          <div className="flex">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-black">🏥 Medical Provider Leads</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              The <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Largest</span> Verified Database of Healthcare Providers
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Access comprehensive data on 9M+ healthcare providers, including verified contact information and practice details.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#contact"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get Started
              </a>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              {/* Filter Indicators */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Active Filters: 2</span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">Specialty: Cardiology, Primary Care, Pediatrics, Orthopedics, Dermatology, Neurology</span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">Location: NY, CA, FL, IL, TX, MA, WA, AZ, CO</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Provider Name</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Specialty</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. Sarah Johnson, MD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Cardiology</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">123 Medical Center Dr, New York, NY 10001</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>sarah.johnson@healthcare.com</div>
                        <div className="text-xs">(212) 555-0123</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. Michael Chen, DO</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Primary Care</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">456 Health Plaza, Los Angeles, CA 90001</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>michael.chen@healthcare.com</div>
                        <div className="text-xs">(310) 555-0124</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. Emily Rodriguez, MD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Pediatrics</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">789 Children's Way, Miami, FL 33101</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>emily.rodriguez@healthcare.com</div>
                        <div className="text-xs">(305) 555-0125</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. James Wilson, MD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">Orthopedics</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">321 Bone & Joint Center, Chicago, IL 60601</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>james.wilson@healthcare.com</div>
                        <div className="text-xs">(312) 555-0126</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. Lisa Patel, MD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Dermatology</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">654 Skin Care Blvd, Houston, TX 77001</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>lisa.patel@healthcare.com</div>
                        <div className="text-xs">(713) 555-0127</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. Robert Martinez, MD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Cardiology</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">987 Heart Street, San Francisco, CA 94101</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>robert.martinez@healthcare.com</div>
                        <div className="text-xs">(415) 555-0128</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. Jennifer Kim, MD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">Neurology</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">147 Brain Center Ave, Boston, MA 02101</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>jennifer.kim@healthcare.com</div>
                        <div className="text-xs">(617) 555-0129</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. David Thompson, DO</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Primary Care</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">258 Health Circle, Seattle, WA 98101</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>david.thompson@healthcare.com</div>
                        <div className="text-xs">(206) 555-0130</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. Maria Garcia, MD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Pediatrics</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">369 Kids Care Lane, Phoenix, AZ 85001</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>maria.garcia@healthcare.com</div>
                        <div className="text-xs">(602) 555-0131</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dr. Thomas Anderson, MD</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">Orthopedics</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">741 Joint Center Dr, Denver, CO 80201</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>thomas.anderson@healthcare.com</div>
                        <div className="text-xs">(303) 555-0132</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>Showing 10 of 9,000+ providers</span>
                <span>Page 1 of 900</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-200 to-primary-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        <div id="features" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Faster Sales Cycles</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to accelerate healthcare sales
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Access verified contact information and practice details for healthcare providers across the United States.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div id="how-it-works" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">How It Works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, powerful, and effective
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get started in minutes with our intuitive platform designed for healthcare sales teams.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {steps.map((step) => (
                <div key={step.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <step.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                    {step.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{step.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div id="contact" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Start your 30-day free trial</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Access our complete healthcare provider database
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Setup and use Provider Intelligence without any limits or restrictions. Start accessing verified healthcare provider data in the next few minutes, sign up below:
            </p>
            <p className="mt-2 text-sm text-gray-600">
              You can change your plan later or at any time.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <iframe
              data-tally-src="https://tally.so/embed/w7EY0R?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="364"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="MedicalProviderLeads"
              style={{ maxWidth: '100%', margin: '0 auto' }}
            ></iframe>
            <p className="mt-4 text-sm text-gray-500 text-center">
              Your card will not be charged until your 30-day trial has ended, and you can cancel + export your data any time before that.
            </p>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-sm font-semibold text-gray-900">Trusted by leading healthcare sales teams at:</h3>
            <div className="mt-6 flex justify-center gap-x-8">
              <span className="text-lg font-semibold text-gray-900">IBM Healthcare</span>
              <span className="text-lg font-semibold text-gray-900">McKesson</span>
              <span className="text-lg font-semibold text-gray-900">Cardinal Health</span>
              <span className="text-lg font-semibold text-gray-900">Medtronic</span>
            </div>
          </div>
        </div>

        <footer className="mx-auto mt-32 max-w-7xl px-6 pb-8 sm:mt-56 lg:px-8">
          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-500">
              &copy; 2024 Provider Intelligence. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

const features = [
  {
    name: 'Verified Contact Information',
    description: 'Access accurate email addresses, phone numbers, and practice locations for healthcare providers.',
    icon: function ContactIcon(props) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      );
    },
  },
  {
    name: 'Practice Details',
    description: 'Get comprehensive information about provider practices, specialties, and service areas.',
    icon: function PracticeIcon(props) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      );
    },
  },
  {
    name: 'Comprehensive Database',
    description: 'Access our extensive database of healthcare providers with verified information and practice details.',
    icon: function DatabaseIcon(props) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>
      );
    },
  },
];

const steps = [
  {
    name: 'Sign Up',
    description: 'Create your account and choose your subscription plan.',
    icon: function SignUpIcon(props) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      );
    },
  },
  {
    name: 'Search & Filter',
    description: 'Find healthcare providers using our advanced search and filtering tools.',
    icon: function SearchIcon(props) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      );
    },
  },
  {
    name: 'Export & Connect',
    description: 'Export provider lists and connect with decision-makers through our platform.',
    icon: function ExportIcon(props) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      );
    },
  },
]; 