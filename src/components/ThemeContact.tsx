
import React from 'react';
import { currentTheme } from '../App';
import SEOHelmet from './SEOHelmet';

// Import theme components
import CleaningContact from '../themes/cleaning/pages/CleaningContact';
import PlumbingContact from '../themes/plumbing/pages/PlumbingContact';
import RoofingContact from '../themes/roofing/pages/RoofingContact';
import HVACContact from '../themes/hvac/pages/HVACContact';
import PaintingContact from '../themes/painting/pages/PaintingContact';

const ThemeContact = () => {
  const getThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningContact />;
      case 'plumbing':
        return <PlumbingContact />;
      case 'roofing':
        return <RoofingContact />;
      case 'hvac':
        return <HVACContact />;
      case 'painting':
        return <PaintingContact />;
      default:
        return <CleaningContact />;
    }
  };

  return (
    <>
      <SEOHelmet pageUrl="/contact" />
      {getThemeComponent()}
    </>
  );
};

export default ThemeContact;
