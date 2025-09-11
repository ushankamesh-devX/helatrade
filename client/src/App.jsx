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
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
