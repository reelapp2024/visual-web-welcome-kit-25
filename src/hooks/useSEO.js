
import { useState, useEffect } from 'react';
import { httpFile } from '../config.js';

export const useSEO = (pageUrl) => {
  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        setLoading(true);
        const savedSiteId = localStorage.getItem("currentSiteId");
        const projectId = savedSiteId || import.meta.env.VITE_PROJECT_ID || "685e9579244805bf82af09da";
        
        const formData = new FormData();
        formData.append('projectId', projectId);
        formData.append('pageUrl', pageUrl);

        const response = await httpFile.post('/webapp/v1/seo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data && response.data.data) {
          setSeoData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (pageUrl) {
      fetchSeoData();
    }
  }, [pageUrl]);

  return { seoData, loading };
};
