
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningAreas from '../themes/cleaning/pages/CleaningAreas';

// Plumbing Theme
import PlumbingAreas from '../themes/plumbing/pages/PlumbingAreas';

// Roofing Theme
import RoofingAreas from '../themes/roofing/pages/RoofingAreas';

// HVAC Theme
import HVACAreas from '../themes/hvac/pages/HVACAreas';

// Painting Theme
import PaintingAreas from '../themes/painting/pages/PaintingAreas';

const ThemeAreas = () => {
  switch (currentTheme) {
    case 'cleaning':
      return <CleaningAreas />;
    case 'plumbing':
      return <PlumbingAreas />;
    case 'roofing':
      return <RoofingAreas />;
    case 'hvac':
      return <HVACAreas />;
    case 'painting':
      return <PaintingAreas />;
    default:
      return <CleaningAreas />;
  }
};

export default ThemeAreas;
