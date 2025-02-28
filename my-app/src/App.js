import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./member/Login";

const App = () => {
  return (
    <Router>
              
      <div className="app">
                
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
                
      </div>
          
    </Router>
  );
};

export default App;
