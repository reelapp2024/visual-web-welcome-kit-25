
import React, { useEffect } from 'react';
import PlumbingIndex from '../themes/plumbing/pages/PlumbingIndex';

const Index = () => {
  useEffect(() => {
    // Check for siteId in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const siteId = urlParams.get('siteId');
    
    if (siteId) {
      // Update the environment variable
      import.meta.env.VITE_PROJECT_ID = siteId;
      console.log('Updated project ID from URL:', siteId);
    }
  }, []);

  return <PlumbingIndex />;
};

export default Index;
