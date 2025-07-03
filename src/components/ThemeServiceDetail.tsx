
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

// Cleaning Theme
import CleaningServiceDetail from '../themes/cleaning/pages/CleaningServiceDetail';

// Plumbing Theme
import PlumbingServiceDetail from '../themes/plumbing/pages/PlumbingServiceDetail';

// Roofing Theme
import RoofingServiceDetail from '../themes/roofing/pages/RoofingServiceDetail';

// HVAC Theme
import HVACServiceDetail from '../themes/hvac/pages/HVACServiceDetail';

// Painting Theme
import PaintingServiceDetail from '../themes/painting/pages/PaintingServiceDetail';

const ThemeServiceDetail = () => {
  const location = useLocation();
  const { seoData } = useSEO(location.pathname);

  const renderThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningServiceDetail />;
      case 'plumbing':
        return <PlumbingServiceDetail />;
      case 'roofing':
        return <RoofingServiceDetail />;
      case 'hvac':
        return <HVACServiceDetail />;
      case 'painting':
        return <PaintingServiceDetail />;
      default:
        return <CleaningServiceDetail />;
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

export default ThemeServiceDetail;
