
import React from 'react';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningAreaDetail from '../themes/cleaning/pages/CleaningAreaDetail';
import PlumbingAreaDetail from '../themes/plumbing/pages/PlumbingAreaDetail';
import RoofingAreaDetail from '../themes/roofing/pages/RoofingAreaDetail';
import HVACAreaDetail from '../themes/hvac/pages/HVACAreaDetail';
import PaintingAreaDetail from '../themes/painting/pages/PaintingAreaDetail';

const ThemeAreaDetail = () => {
  const location = useLocation();
  const areaDetailUrl = location.pathname;

  const getThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningAreaDetail />;
      case 'plumbing':
        return <PlumbingAreaDetail />;
      case 'roofing':
        return <RoofingAreaDetail />;
      case 'hvac':
        return <HVACAreaDetail />;
      case 'painting':
        return <PaintingAreaDetail />;
      default:
        return <CleaningAreaDetail />;
    }
  };

  return (
    <>
      <SEOHelmet pageUrl={areaDetailUrl} />
      {getThemeComponent()}
    </>
  );
};

export default ThemeAreaDetail;
