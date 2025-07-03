
import React from 'react';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningState from '../themes/cleaning/pages/CleaningState';
import PlumbingState from '../themes/plumbing/pages/PlumbingState';
import RoofingState from '../themes/roofing/pages/RoofingState';
import HVACState from '../themes/hvac/pages/HVACState';
import PaintingState from '../themes/painting/pages/PaintingState';

const ThemeState = () => {
  const location = useLocation();
  const stateUrl = location.pathname;

  const getThemeComponent = () => {
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

  return (
    <>
      <SEOHelmet pageUrl={stateUrl} />
      {getThemeComponent()}
    </>
  );
};

export default ThemeState;
