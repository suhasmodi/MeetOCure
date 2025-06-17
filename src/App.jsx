import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DualLoginPage from "./pages/DualLoginPage";
import DualRegisterPage from "./pages/DualRegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<DualLoginPage />} />
      <Route path="/register" element={<DualRegisterPage />} />
    </Routes>
  );
}

export default App;
