import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ExploreProducts from "./pages/ExploreProducts";
import SingleProduct from "./pages/SingleProduct";
import ProducerProfile from "./pages/ProducerProfile";
import ProducerDashboard from "./pages/ProducerDashboard";
import EditProfilePage from "./pages/EditProfilePage";
import StoreDashboard from "./pages/StoreDashboard";
import Login from "./pages/Login";
import ProducerRegistration from "./pages/ProducerRegistration";
import StoreRegistration from "./pages/StoreRegistration";
import ProducerWelcome from "./pages/ProducerWelcome";
import StoreOnboarding from "./pages/StoreOnboarding";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore-products" element={<ExploreProducts />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/producer/:producerId" element={<ProducerProfile />} />
          <Route path="/producer-dashboard" element={<ProducerDashboard />} />
          <Route path="/store-dashboard" element={<StoreDashboard />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register-producer" element={<ProducerRegistration />} />
          <Route path="/register-store" element={<StoreRegistration />} />
          <Route path="/producer-welcome" element={<ProducerWelcome />} />
          <Route path="/store-onboarding" element={<StoreOnboarding />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
