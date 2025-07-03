
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO } from '../hooks/useSEO.js';

interface SEOHelmetProps {
  pageUrl?: string;
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({ 
  pageUrl = '/home', 
  title, 
  description, 
  keywords,
  children 
}) => {
  const { seoData, isLoading } = useSEO(pageUrl);

  // Use props first, then API data, then defaults
  const finalTitle = title || seoData.meta_title || 'Professional Services';
  const finalDescription = description || seoData.meta_description || 'Professional services with expert team';
  const finalKeywords = keywords || seoData.meta_keywords || 'professional services';

  if (isLoading) {
    return (
      <Helmet>
        <title>Loading...</title>
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      
      {children}
    </Helmet>
  );
};

export default SEOHelmet;
