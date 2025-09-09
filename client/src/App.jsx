import { useState } from "react";
import "./App.css";
import ColorShowcase from "./components/ColorShowcase";

function App() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <ColorShowcase/>
      </div>
    </>
  );
}

export default App;
