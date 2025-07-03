
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

// Cleaning Theme
import CleaningIndex from '../themes/cleaning/pages/CleaningIndex';

// Plumbing Theme  
import PlumbingIndex from '../themes/plumbing/pages/PlumbingIndex';

// Roofing Theme
import RoofingIndex from '../themes/roofing/pages/RoofingIndex';

// HVAC Theme
import HVACIndex from '../themes/hvac/pages/HVACIndex';

// Painting Theme
import PaintingIndex from '../themes/painting/pages/PaintingIndex';

const ThemeIndex = () => {
  const { seoData } = useSEO('/home');

  const renderThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningIndex />;
      case 'plumbing':
        return <PlumbingIndex />;
      case 'roofing':
        return <RoofingIndex />;
      case 'hvac':
        return <HVACIndex />;
      case 'painting':
        return <PaintingIndex />;
      default:
        return <CleaningIndex />;
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

export default ThemeIndex;
