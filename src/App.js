import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pricing from './Pricing';
import ErrorPage from './ErrorPage';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
} 