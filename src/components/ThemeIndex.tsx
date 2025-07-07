
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { currentTheme } from '../App';
import { useSEO } from '../hooks/useSEO';

console.log('ThemeIndex component loading...');

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
  console.log('ThemeIndex rendering with theme:', currentTheme);
  
  const { seoData } = useSEO('/home');
  console.log('SEO data loaded:', seoData);

  const renderThemeComponent = () => {
    console.log('Rendering theme component for:', currentTheme);
    switch (currentTheme) {
      case 'cleaning':
        console.log('Loading CleaningIndex component');
        return <CleaningIndex />;
      case 'plumbing':
        console.log('Loading PlumbingIndex component');
        return <PlumbingIndex />;
      case 'roofing':
        console.log('Loading RoofingIndex component');
        return <RoofingIndex />;
      case 'hvac':
        console.log('Loading HVACIndex component');
        return <HVACIndex />;
      case 'painting':
        console.log('Loading PaintingIndex component');
        return <PaintingIndex />;
      default:
        console.log('Default to CleaningIndex component');
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
