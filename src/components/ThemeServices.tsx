
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningServicesPage from '../themes/cleaning/pages/CleaningServices';

// Plumbing Theme
import PlumbingServices from '../themes/plumbing/pages/PlumbingServices';

// Roofing Theme
import RoofingServices from '../themes/roofing/pages/RoofingServices';

// HVAC Theme
import HVACServices from '../themes/hvac/pages/HVACServices';

// Painting Theme
import PaintingServicesPage from '../themes/painting/pages/PaintingServices';

const ThemeServices = () => {
  switch (currentTheme) {
    case 'cleaning':
      return <CleaningServicesPage />;
    case 'plumbing':
      return <PlumbingServices />;
    case 'roofing':
      return <RoofingServices />;
    case 'hvac':
      return <HVACServices />;
    case 'painting':
      return <PaintingServicesPage />;
    default:
      return <CleaningServicesPage />;
  }
};

export default ThemeServices;
