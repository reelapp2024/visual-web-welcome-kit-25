
import React from 'react';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningCity from '../themes/cleaning/pages/CleaningCity';
import PlumbingCity from '../themes/plumbing/pages/PlumbingCity';
import RoofingCity from '../themes/roofing/pages/RoofingCity';
import HVACCity from '../themes/hvac/pages/HVACCity';
import PaintingCity from '../themes/painting/pages/PaintingCity';

const ThemeCity = () => {
  const location = useLocation();
  const cityUrl = location.pathname;

  const getThemeComponent = () => {
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

  return (
    <>
      <SEOHelmet pageUrl={cityUrl} />
      {getThemeComponent()}
    </>
  );
};

export default ThemeCity;
