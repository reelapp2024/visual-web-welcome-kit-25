
import React from 'react';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningAbout from '../themes/cleaning/pages/CleaningAbout';
import PlumbingAbout from '../themes/plumbing/pages/PlumbingAbout';
import RoofingAbout from '../themes/roofing/pages/RoofingAbout';
import HVACAbout from '../themes/hvac/pages/HVACAbout';
import PaintingAbout from '../themes/painting/pages/PaintingAbout';

const ThemeAbout = () => {
  const getThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningAbout />;
      case 'plumbing':
        return <PlumbingAbout />;
      case 'roofing':
        return <RoofingAbout />;
      case 'hvac':
        return <HVACAbout />;
      case 'painting':
        return <PaintingAbout />;
      default:
        return <CleaningAbout />;
    }
  };

  return (
    <>
      <SEOHelmet pageUrl="/about" />
      {getThemeComponent()}
    </>
  );
};

export default ThemeAbout;
