import React, { useState } from 'react';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Track form submission event
    if (window.gtag) {
      window.gtag('event', 'form_submission', {
        'event_category': 'engagement',
        'event_label': 'signup_form',
        'value': selectedPlan,
        'plan_type': selectedPlan,
        'email_domain': document.getElementById('email').value.split('@')[1]
      });
    }

    // Here you would typically handle the form submission
    // For now, we'll just show an alert
    alert('Thank you for your interest! We will contact you shortly.');
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-center p-6 lg:px-8" aria-label="Global">
          <div className="flex">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-black">🏥 Provider Intelligence</span>
            </a>
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
              The Largest Verified Database of Healthcare Decision-Makers
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Access comprehensive data on 9M+ healthcare providers, including verified contact information, practice details, and decision-making insights.
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
            Access verified contact information, practice details, and decision-making insights for healthcare providers across the United States.
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

        <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Your email address
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="luna@company.com"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                Create a password
              </label>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Shh, it's a secret..."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="card" className="block text-sm font-semibold leading-6 text-gray-900">
                Credit card info
              </label>
              <div className="mt-2.5 grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="card-number"
                  id="card-number"
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  pattern="[0-9\s]{13,19}"
                  className="col-span-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  onKeyPress={(e) => {
                    if (!/[0-9\s]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\s/g, '');
                    if (value.length > 16) value = value.slice(0, 16);
                    value = value.replace(/(\d{4})/g, '$1 ').trim();
                    e.target.value = value;
                  }}
                />
                <input
                  type="text"
                  name="card-cvc"
                  id="card-cvc"
                  maxLength="4"
                  placeholder="123"
                  pattern="[0-9]{3,4}"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Create account
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Your card will not be charged until your 30-day trial has ended, and you can cancel + export your data any time before that.
            </p>
          </div>
        </form>

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
    name: 'Decision-Making Insights',
    description: 'Understand provider decision-making processes and identify key stakeholders in healthcare organizations.',
    icon: function InsightsIcon(props) {
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
            d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
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