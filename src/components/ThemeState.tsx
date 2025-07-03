
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

// Cleaning Theme
import CleaningState from '../themes/cleaning/pages/CleaningState';

// Plumbing Theme
import PlumbingState from '../themes/plumbing/pages/PlumbingState';

// Roofing Theme
import RoofingState from '../themes/roofing/pages/RoofingState';

// HVAC Theme
import HVACState from '../themes/hvac/pages/HVACState';

// Painting Theme
import PaintingState from '../themes/painting/pages/PaintingState';

const ThemeState = () => {
  const location = useLocation();
  const { seoData } = useSEO(location.pathname);

  const renderThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningState />;
      case 'plumbing':
        return <PlumbingState />;
      case 'roofing':
        return <RoofingState />;
      case 'hvac':
        return <HVACState />;
      case 'painting':
        return <PaintingState />;
      default:
        return <CleaningState />;
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

export default ThemeState;
