
import React from 'react';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningAreas from '../themes/cleaning/pages/CleaningAreas';
import PlumbingAreas from '../themes/plumbing/pages/PlumbingAreas';
import RoofingAreas from '../themes/roofing/pages/RoofingAreas';
import HVACAreas from '../themes/hvac/pages/HVACAreas';
import PaintingAreas from '../themes/painting/pages/PaintingAreas';

const ThemeAreas = () => {
  const getThemeComponent = () => {
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

  return (
    <>
      <SEOHelmet pageUrl="/areas" />
      {getThemeComponent()}
    </>
  );
};

export default ThemeAreas;
