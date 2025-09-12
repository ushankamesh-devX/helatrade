import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StoreOnboarding = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const tutorials = [
    {
      id: 1,
      title: 'Finding Producers',
      description: 'Learn how to search and connect with quality producers',
      icon: '🔍',
      steps: [
        'Use the search bar to find producers by location, category, or name',
        'Browse the Explore page to discover new producers',
        'Read producer profiles to understand their specialties',
        'Send connection requests to producers you want to work with'
      ]
    },
    {
      id: 2,
      title: 'Managing Connections',
      description: 'Build and maintain relationships with your producer network',
      icon: '🤝',
      steps: [
        'Monitor your connections in the Connections Hub',
        'Communicate directly with producers through messages',
        'Set up alerts for new products from your connected producers',
        'Rate and review producers after successful transactions'
      ]
    },
    {
      id: 3,
      title: 'Sourcing Products',
      description: 'Efficiently source products for your business',
      icon: '📦',
      steps: [
        'Browse available products in the Products section',
        'Use filters to find products that match your requirements',
        'Contact producers for pricing and availability',
        'Track your inquiries and orders in your dashboard'
      ]
    },
    {
      id: 4,
      title: 'Dashboard Overview',
      description: 'Navigate your store dashboard like a pro',
      icon: '📊',
      steps: [
        'Monitor your business metrics and activity',
        'Manage your store profile and settings',
        'View and respond to messages from producers',
        'Access analytics to understand your sourcing patterns'
      ]
    }
  ]

  const nextStep = () => {
    if (currentStep < tutorials.length) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/store-dashboard')
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTutorial = () => {
    navigate('/store-dashboard')
  }

  const currentTutorial = tutorials[currentStep - 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Welcome to HelaTrade! 🎉
          </h1>
          <p className="text-xl text-primary-600 mb-2">
            Your store account is ready
          </p>
          <p className="text-sm text-primary-500">
            Let's get you started with a quick tutorial
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-primary-700">
              Tutorial Progress
            </span>
            <span className="text-sm text-primary-500">
              {currentStep} of {tutorials.length}
            </span>
          </div>
          <div className="w-full bg-primary-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / tutorials.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tutorial Content */}
        <div className="bg-white rounded-xl shadow-lg border border-primary-200 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
              {currentTutorial.icon}
            </div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              {currentTutorial.title}
            </h2>
            <p className="text-primary-600">
              {currentTutorial.description}
            </p>
          </div>

          <div className="space-y-4">
            {currentTutorial.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  {index + 1}
                </div>
                <p className="text-primary-700 pt-0.5">{step}</p>
              </div>
            ))}
          </div>

          {/* Interactive Demo Area */}
          <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-center justify-center space-x-2 text-primary-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-sm font-medium">
                Pro Tip: You can access this tutorial anytime from your dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <button
            onClick={skipTutorial}
            className="px-4 py-2 text-sm text-primary-500 hover:text-primary-700 transition-colors"
          >
            Skip Tutorial
          </button>

          <button
            onClick={nextStep}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentStep === tutorials.length ? 'Get Started' : 'Next'}
          </button>
        </div>

        {/* Quick Tips */}
        {currentStep === tutorials.length && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Ready to Start Sourcing?</h3>
                <p className="text-sm text-yellow-700 mb-3">
                  Here are some quick actions you can take right away:
                </p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Browse the Explore page to find producers in your area</li>
                  <li>• Update your store profile with more details</li>
                  <li>• Set up product alerts for items you frequently source</li>
                  <li>• Connect with the recommended producers from your registration</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreOnboarding