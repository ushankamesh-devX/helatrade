import React from 'react'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import EditProfile from '../components/producer/EditProfile'

const EditProfilePage = () => {
  return (
    <div className="min-h-screen bg-primary-50">
      <Header />
      
      <div className="max-w-7xlxx mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EditProfile />
      </div>

      <Footer />
    </div>
  )
}

export default EditProfilePage