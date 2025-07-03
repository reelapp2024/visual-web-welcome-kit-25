
import React from 'react';
import { currentTheme } from '../App';

// Cleaning Theme
import CleaningContact from '../themes/cleaning/pages/CleaningContact';

// Plumbing Theme
import PlumbingContact from '../themes/plumbing/pages/PlumbingContact';

// Roofing Theme
import RoofingContact from '../themes/roofing/pages/RoofingContact';

// HVAC Theme
import HVACContact from '../themes/hvac/pages/HVACContact';

// Painting Theme
import PaintingContact from '../themes/painting/pages/PaintingContact';

const ThemeContact = () => {
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

export default ThemeContact;
