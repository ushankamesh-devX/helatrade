import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ExploreProducts from "./pages/ExploreProducts";
import SingleProduct from "./pages/SingleProduct";
import ProducerProfile from "./pages/ProducerProfile";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
