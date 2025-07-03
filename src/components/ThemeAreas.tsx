
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

// Cleaning Theme
import CleaningAreas from '../themes/cleaning/pages/CleaningAreas';

// Plumbing Theme
import PlumbingAreas from '../themes/plumbing/pages/PlumbingAreas';

// Roofing Theme
import RoofingAreas from '../themes/roofing/pages/RoofingAreas';

// HVAC Theme
import HVACAreas from '../themes/hvac/pages/HVACAreas';

// Painting Theme
import PaintingAreas from '../themes/painting/pages/PaintingAreas';

const ThemeAreas = () => {
  const { seoData } = useSEO('/areas');

  const renderThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningAreas />;
      case 'plumbing':
        return <PlumbingAreas />;
      case 'roofing':
        return <RoofingAreas />;
      case 'hvac':
        return <HVACAreas />;
      case 'painting':
        return <PaintingAreas />;
      default:
        return <CleaningAreas />;
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

export default ThemeAreas;
