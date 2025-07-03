
import React from 'react';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningCountry from '../themes/cleaning/pages/CleaningCountry';
import PlumbingCountry from '../themes/plumbing/pages/PlumbingCountry';
import RoofingCountry from '../themes/roofing/pages/RoofingCountry';
import HVACCountry from '../themes/hvac/pages/HVACCountry';
import PaintingCountry from '../themes/painting/pages/PaintingCountry';

const ThemeCountry = () => {
  const location = useLocation();
  const countryUrl = location.pathname;

  const getThemeComponent = () => {
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

  return (
    <>
      <SEOHelmet pageUrl={countryUrl} />
      {getThemeComponent()}
    </>
  );
};

export default ThemeCountry;
