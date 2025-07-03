
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

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
  const { seoData } = useSEO('/about');

  const renderThemeComponent = () => {
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

export default ThemeAbout;
