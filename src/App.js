import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Pricing from './Pricing';
import ErrorPage from './ErrorPage';
import LandingPage from './pages/LandingPage';
import TexasCardiology from './pages/texas-cardiology';
import StateSpecialtyPage from './pages/StateSpecialtyPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Legacy routes */}
        <Route path="/texas/cardiology" element={<TexasCardiology />} />
        
        {/* Support legacy routes with specialty codes - redirect to human-readable URLs */}
        <Route path="/:state/207RC0000X" element={<Navigate to={params => `/${params.state}/cardiology`} replace />} />
        <Route path="/:state/207R00000X" element={<Navigate to={params => `/${params.state}/internal-medicine`} replace />} />
        <Route path="/:state/207Q00000X" element={<Navigate to={params => `/${params.state}/family-medicine`} replace />} />
        
        {/* Dynamic route for all state/specialty combinations with user-friendly slugs */}
        <Route path="/:state/:specialty" element={<StateSpecialtyPage />} />
        
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}