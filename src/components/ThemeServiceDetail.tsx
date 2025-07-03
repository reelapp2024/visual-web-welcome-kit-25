
import React from 'react';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningServiceDetail from '../themes/cleaning/pages/CleaningServiceDetail';
import PlumbingServiceDetail from '../themes/plumbing/pages/PlumbingServiceDetail';
import RoofingServiceDetail from '../themes/roofing/pages/RoofingServiceDetail';
import HVACServiceDetail from '../themes/hvac/pages/HVACServiceDetail';
import PaintingServiceDetail from '../themes/painting/pages/PaintingServiceDetail';

const ThemeServiceDetail = () => {
  const location = useLocation();
  const serviceDetailUrl = location.pathname;

  const getThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningServiceDetail />;
      case 'plumbing':
        return <PlumbingServiceDetail />;
      case 'roofing':
        return <RoofingServiceDetail />;
      case 'hvac':
        return <HVACServiceDetail />;
      case 'painting':
        return <PaintingServiceDetail />;
      default:
        return <CleaningServiceDetail />;
    }
  };

  return (
    <>
      <SEOHelmet pageUrl={serviceDetailUrl} />
      {getThemeComponent()}
    </>
  );
};

export default ThemeServiceDetail;
