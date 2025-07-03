
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

// Cleaning Theme
import CleaningServicesPage from '../themes/cleaning/pages/CleaningServices';

// Plumbing Theme
import PlumbingServices from '../themes/plumbing/pages/PlumbingServices';

// Roofing Theme
import RoofingServices from '../themes/roofing/pages/RoofingServices';

// HVAC Theme
import HVACServices from '../themes/hvac/pages/HVACServices';

// Painting Theme
import PaintingServicesPage from '../themes/painting/pages/PaintingServices';

const ThemeServices = () => {
  const { seoData } = useSEO('/services');

  const renderThemeComponent = () => {
    switch (currentTheme) {
      case 'cleaning':
        return <CleaningServicesPage />;
      case 'plumbing':
        return <PlumbingServices />;
      case 'roofing':
        return <RoofingServices />;
      case 'hvac':
        return <HVACServices />;
      case 'painting':
        return <PaintingServicesPage />;
      default:
        return <CleaningServicesPage />;
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

export default ThemeServices;
