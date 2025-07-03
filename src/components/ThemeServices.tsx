
import React from 'react';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningServices from '../themes/cleaning/pages/CleaningServices';
import PlumbingServices from '../themes/plumbing/pages/PlumbingServices';
import RoofingServices from '../themes/roofing/pages/RoofingServices';
import HVACServices from '../themes/hvac/pages/HVACServices';
import PaintingServices from '../themes/painting/pages/PaintingServices';

const ThemeServices = () => {
  const getThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningServices />;
      case 'plumbing':
        return <PlumbingServices />;
      case 'roofing':
        return <RoofingServices />;
      case 'hvac':
        return <HVACServices />;
      case 'painting':
        return <PaintingServices />;
      default:
        return <CleaningServices />;
    }
  };

  return (
    <>
      <SEOHelmet pageUrl="/services" />
      {getThemeComponent()}
    </>
  );
};

export default ThemeServices;
