
import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import PlumbingIndex from '../themes/plumbing/pages/PlumbingIndex';

const Index = () => {
  return (
    <>
      <SEOHelmet pageUrl="/home" />
      <PlumbingIndex />
    </>
  );
};

export default Index;
