
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningCity from '../themes/cleaning/pages/CleaningCity';

// Plumbing Theme
import PlumbingCity from '../themes/plumbing/pages/PlumbingCity';

// Roofing Theme
import RoofingCity from '../themes/roofing/pages/RoofingCity';

// HVAC Theme
import HVACCity from '../themes/hvac/pages/HVACCity';

// Painting Theme
import PaintingCity from '../themes/painting/pages/PaintingCity';

const ThemeCity = () => {
  switch (currentTheme) {
    case 'cleaning':
      return <CleaningCity />;
    case 'plumbing':
      return <PlumbingCity />;
    case 'roofing':
      return <RoofingCity />;
    case 'hvac':
      return <HVACCity />;
    case 'painting':
      return <PaintingCity />;
    default:
      return <CleaningCity />;
  }
};

export default ThemeCity;
