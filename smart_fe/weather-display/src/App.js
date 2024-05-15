import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HumidityComponent from "./humidity.js"; // Importing the renamed component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/humidity" element={<HumidityComponent />} />{" "}
        {/* Using the renamed import */}
      </Routes>
    </Router>
  );
}

export default App;
