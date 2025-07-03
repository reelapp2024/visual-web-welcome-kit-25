
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningAreaDetail from '../themes/cleaning/pages/CleaningAreaDetail';

// Plumbing Theme
import PlumbingAreaDetail from '../themes/plumbing/pages/PlumbingAreaDetail';

// Roofing Theme
import RoofingAreaDetail from '../themes/roofing/pages/RoofingAreaDetail';

// HVAC Theme (using Areas as fallback)
import HVACAreas from '../themes/hvac/pages/HVACAreas';

// Painting Theme
import PaintingAreaDetail from '../themes/painting/pages/PaintingAreaDetail';

const ThemeAreaDetail = () => {
  switch (currentTheme) {
    case 'cleaning':
      return <CleaningAreaDetail />;
    case 'plumbing':
      return <PlumbingAreaDetail />;
    case 'roofing':
      return <RoofingAreaDetail />;
    case 'hvac':
      return <HVACAreas />;
    case 'painting':
      return <PaintingAreaDetail />;
    default:
      return <CleaningAreaDetail />;
  }
};

export default ThemeAreaDetail;
