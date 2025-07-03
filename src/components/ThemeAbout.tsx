
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningAbout from '../themes/cleaning/pages/CleaningAbout';

// Plumbing Theme
import PlumbingAbout from '../themes/plumbing/pages/PlumbingAbout';

// Roofing Theme
import RoofingAbout from '../themes/roofing/pages/RoofingAbout';

// HVAC Theme
import HVACAbout from '../themes/hvac/pages/HVACAbout';

// Painting Theme
import PaintingAbout from '../themes/painting/pages/PaintingAbout';

const ThemeAbout = () => {
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

export default ThemeAbout;
