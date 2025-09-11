import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ProducerProfile from "./pages/ProducerProfile";

function App() {
  return (
    <Router>
      <div className="text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/producer/:producerId" element={<ProducerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
