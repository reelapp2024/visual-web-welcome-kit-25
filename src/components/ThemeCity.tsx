
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

// Cleaning Theme
import CleaningCity from '../themes/cleaning/pages/CleaningCity';

// Plumbing Theme
import PlumbingCity from '../themes/plumbing/pages/PlumbingCity';

// Roofing Theme
import RoofingCity from '../themes/roofing/pages/RoofingCity';

// HVAC Theme
import HVACCity from '../themes/hvac/pages/HVACCity';

// Painting Theme
import PaintingCity from '../themes/painting/pages/PaintingCity';

const ThemeCity = () => {
  const location = useLocation();
  const { seoData } = useSEO(location.pathname);

  const renderThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningCity />;
      case 'plumbing':
        return <PlumbingCity />;
      case 'roofing':
        return <RoofingCity />;
      case 'hvac':
        return <HVACCity />;
      case 'painting':
        return <PaintingCity />;
      default:
        return <CleaningCity />;
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

export default ThemeCity;
