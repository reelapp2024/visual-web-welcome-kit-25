
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

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
  const { seoData } = useSEO('/contact');

  const renderThemeComponent = () => {
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
    <HelmetProvider>
      <Helmet>
        <title>{seoData.meta_title}</title>
        <meta name="description" content={seoData.meta_description} />
        <meta name="keywords" content={seoData.meta_keywords} />
      </Helmet>
      {renderThemeComponent()}
    </HelmetProvider>
  );
};

export default ThemeContact;
