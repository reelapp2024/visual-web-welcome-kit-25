
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningState from '../themes/cleaning/pages/CleaningState';

// Plumbing Theme
import PlumbingState from '../themes/plumbing/pages/PlumbingState';

// Roofing Theme
import RoofingState from '../themes/roofing/pages/RoofingState';

// HVAC Theme
import HVACState from '../themes/hvac/pages/HVACState';

// Painting Theme
import PaintingState from '../themes/painting/pages/PaintingState';

const ThemeState = () => {
  switch (currentTheme) {
    case 'cleaning':
      return <CleaningState />;
    case 'plumbing':
      return <PlumbingState />;
    case 'roofing':
      return <RoofingState />;
    case 'hvac':
      return <HVACState />;
    case 'painting':
      return <PaintingState />;
    default:
      return <CleaningState />;
  }
};

export default ThemeState;
