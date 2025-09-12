import React, { useState, useEffect } from 'react'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import ProducerHomeFeed from '../components/producer/ProducerHomeFeed'
import CreatePostInterface from '../components/producer/CreatePostInterface'
import ContentManagement from '../components/producer/ContentManagement'
import ProductsSection from '../components/producer/ProductsSection'
import ConnectionsHub from '../components/producer/ConnectionsHub'
import AnalyticsDashboard from '../components/producer/AnalyticsDashboard'
import EditProfile from '../components/producer/EditProfile'

const ProducerDashboard = () => {
  const [activeTab, setActiveTab] = useState('home')

  // Listen for profile tab selection from header
  useEffect(() => {
    const handleSelectProfileTab = () => {
      setActiveTab('profile')
    }

    window.addEventListener('selectProfileTab', handleSelectProfileTab)
    return () => {
      window.removeEventListener('selectProfileTab', handleSelectProfileTab)
    }
  }, [])

  const tabs = [
    { id: 'home', label: 'Home Feed', icon: 'home' },
    { id: 'create', label: 'Create Post', icon: 'plus' },
    { id: 'content', label: 'Content', icon: 'folder' },
    { id: 'products', label: 'Products', icon: 'package' },
    { id: 'connections', label: 'Connections', icon: 'users' },
    { id: 'analytics', label: 'Analytics', icon: 'chart' },
    { id: 'profile', label: 'Edit Profile', icon: 'settings' },
  ]

  const getTabIcon = (iconType) => {
    const icons = {
      home: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
      ),
      plus: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      ),
      folder: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      ),
      package: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-2H8l-1 2H5V5z" clipRule="evenodd" />
        </svg>
      ),
      users: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      chart: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      settings: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    }
    return icons[iconType] || icons.home
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <ProducerHomeFeed />
      case 'create':
        return <CreatePostInterface />
      case 'content':
        return <ContentManagement />
      case 'products':
        return <ProductsSection />
      case 'connections':
        return <ConnectionsHub />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'profile':
        return <EditProfile />
      default:
        return <ProducerHomeFeed />
    }
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <Header />
      
      <div className="max-w-7xlxx mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900">Producer Dashboard</h1>
              <p className="text-primary-600 mt-1">Manage your content, products, and connections</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 border rounded-lg transition-colors text-sm ${
                  activeTab === 'profile'
                    ? 'border-orange-500 text-orange-700 bg-orange-50'
                    : 'border-primary-300 text-primary-700 hover:bg-primary-50'
                }`}
              >
                Edit Profile
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-primary-900">John Doe</p>
                <p className="text-xs text-orange-600">Verified Producer</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white rounded-xl p-2 shadow-sm border border-primary-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-100 text-orange-700 shadow-sm'
                    : 'text-primary-600 hover:text-orange-600 hover:bg-primary-50'
                }`}
              >
                {getTabIcon(tab.icon)}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="min-h-[600px]">
          {renderContent()}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProducerDashboard