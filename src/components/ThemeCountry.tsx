
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningCountry from '../themes/cleaning/pages/CleaningCountry';

// Plumbing Theme
import PlumbingCountry from '../themes/plumbing/pages/PlumbingCountry';

// Roofing Theme
import RoofingCountry from '../themes/roofing/pages/RoofingCountry';

// HVAC Theme
import HVACCountry from '../themes/hvac/pages/HVACCountry';

// Painting Theme
import PaintingCountry from '../themes/painting/pages/PaintingCountry';

const ThemeCountry = () => {
  switch (currentTheme) {
    case 'cleaning':
      return <CleaningCountry />;
    case 'plumbing':
      return <PlumbingCountry />;
    case 'roofing':
      return <RoofingCountry />;
    case 'hvac':
      return <HVACCountry />;
    case 'painting':
      return <PaintingCountry />;
    default:
      return <CleaningCountry />;
  }
};

export default ThemeCountry;
