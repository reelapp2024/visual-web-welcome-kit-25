
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

// Import theme components
import ThemeIndex from './components/ThemeIndex';
import ThemeAbout from './components/ThemeAbout';
import ThemeServices from './components/ThemeServices';
import ThemeContact from './components/ThemeContact';
import ThemeAreas from './components/ThemeAreas';
import ThemeServiceDetail from './components/ThemeServiceDetail';
import ThemeAreaDetail from './components/ThemeAreaDetail';
import ThemeCountry from './components/ThemeCountry';
import ThemeState from './components/ThemeState';
import ThemeCity from './components/ThemeCity';

// Define the current theme
export const currentTheme = 'cleaning';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ThemeIndex />} />
            <Route path="/about" element={<ThemeAbout />} />
            <Route path="/services" element={<ThemeServices />} />
            <Route path="/services/:serviceName" element={<ThemeServiceDetail />} />
            <Route path="/contact" element={<ThemeContact />} />
            <Route path="/areas" element={<ThemeAreas />} />
            <Route path="/areas/:area" element={<ThemeAreaDetail />} />
            <Route path="/privacy-policy" element={<ThemeIndex />} />
            <Route path="/terms-conditions" element={<ThemeIndex />} />
            
            {/* Location-based routes */}
            <Route path="/country" element={<ThemeCountry />} />
            <Route path="/country/:countryName" element={<ThemeState />} />
            <Route path="/country/:countryName/:stateName" element={<ThemeCity />} />
            <Route path="/country/:countryName/:stateName/:cityName" element={<ThemeAreaDetail />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
