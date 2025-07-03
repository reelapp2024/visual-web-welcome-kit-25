
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

// Cleaning Theme
import CleaningCountry from '../themes/cleaning/pages/CleaningCountry';

// Plumbing Theme
import PlumbingCountry from '../themes/plumbing/pages/PlumbingCountry';

// Roofing Theme
import RoofingCountry from '../themes/roofing/pages/RoofingCountry';

// HVAC Theme
import HVACCountry from '../themes/hvac/pages/HVACCountry';

// Painting Theme
import PaintingCountry from '../themes/painting/pages/PaintingCountry';

const ThemeCountry = () => {
  const location = useLocation();
  const { seoData } = useSEO(location.pathname);

  const renderThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningCountry />;
      case 'plumbing':
        return <PlumbingCountry />;
      case 'roofing':
        return <RoofingCountry />;
      case 'hvac':
        return <HVACCountry />;
      case 'painting':
        return <PaintingCountry />;
      default:
        return <CleaningCountry />;
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

export default ThemeCountry;
