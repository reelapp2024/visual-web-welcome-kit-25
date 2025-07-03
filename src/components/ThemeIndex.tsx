
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningIndex from '../themes/cleaning/pages/CleaningIndex';

// Plumbing Theme  
import PlumbingIndex from '../themes/plumbing/pages/PlumbingIndex';

// Roofing Theme
import RoofingIndex from '../themes/roofing/pages/RoofingIndex';

// HVAC Theme
import HVACIndex from '../themes/hvac/pages/HVACIndex';

// Painting Theme
import PaintingIndex from '../themes/painting/pages/PaintingIndex';

const ThemeIndex = () => {
  switch (currentTheme) {
    case 'cleaning':
      return <CleaningIndex />;
    case 'plumbing':
      return <PlumbingIndex />;
    case 'roofing':
      return <RoofingIndex />;
    case 'hvac':
      return <HVACIndex />;
    case 'painting':
      return <PaintingIndex />;
    default:
      return <CleaningIndex />;
  }
};

export default ThemeIndex;
