
import React from 'react';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningIndex from '../themes/cleaning/pages/CleaningIndex';
import PlumbingIndex from '../themes/plumbing/pages/PlumbingIndex';
import RoofingIndex from '../themes/roofing/pages/RoofingIndex';
import HVACIndex from '../themes/hvac/pages/HVACIndex';
import PaintingIndex from '../themes/painting/pages/PaintingIndex';

const ThemeIndex = () => {
  const getThemeComponent = () => {
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

  return (
    <>
      <SEOHelmet pageUrl="/" />
      {getThemeComponent()}
    </>
  );
};

export default ThemeIndex;
