
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

// Cleaning Theme
import CleaningAreaDetail from '../themes/cleaning/pages/CleaningAreaDetail';

// Plumbing Theme
import PlumbingAreaDetail from '../themes/plumbing/pages/PlumbingAreaDetail';

// Roofing Theme
import RoofingAreaDetail from '../themes/roofing/pages/RoofingAreaDetail';

// HVAC Theme (using Areas as fallback)
import HVACAreas from '../themes/hvac/pages/HVACAreas';

// Painting Theme
import PaintingAreaDetail from '../themes/painting/pages/PaintingAreaDetail';

const ThemeAreaDetail = () => {
  const location = useLocation();
  const { seoData } = useSEO(location.pathname);

  const renderThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningAreaDetail />;
      case 'plumbing':
        return <PlumbingAreaDetail />;
      case 'roofing':
        return <RoofingAreaDetail />;
      case 'hvac':
        return <HVACAreas />;
      case 'painting':
        return <PaintingAreaDetail />;
      default:
        return <CleaningAreaDetail />;
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

export default ThemeAreaDetail;
