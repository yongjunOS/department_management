import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./member/Login";
import Admin from "./components/Admin";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;