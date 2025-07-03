
import { useState, useEffect } from 'react';

export const useProjectId = () => {
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    // Check URL for siteId parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const siteIdFromUrl = urlParams.get('siteId');
    
    if (siteIdFromUrl) {
      // Store in localStorage for future use
      localStorage.setItem("currentSiteId", siteIdFromUrl);
      setProjectId(siteIdFromUrl);
      
      // Update .env project ID if possible
      if (import.meta.env.VITE_PROJECT_ID !== siteIdFromUrl) {
        console.log('Project ID from URL:', siteIdFromUrl);
      }
    } else {
      // Fallback hierarchy: env > localStorage > hardcoded
      const envProjectId = import.meta.env.VITE_PROJECT_ID;
      const savedSiteId = localStorage.getItem("currentSiteId");
      const finalProjectId = envProjectId || savedSiteId || "685e9579244805bf82af09da";
      
      setProjectId(finalProjectId);
    }
  }, []);

  return projectId;
};
