
import { useState, useEffect } from 'react';
import { httpFile } from '../config.js';
import { useProjectId } from './useProjectId.js';

export const useSEO = (pageUrl = '/home') => {
  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const projectId = useProjectId();

  useEffect(() => {
    const fetchSEOData = async () => {
      if (!projectId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await httpFile.post('/webapp/v1/seo', {
          projectId: projectId,
          pageUrl: pageUrl
        });
        
        if (response.data && response.data.data) {
          setSeoData(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching SEO data:', err);
        setError(err);
        // Set default SEO data on error
        setSeoData({
          meta_title: 'Professional Services | Your Trusted Partner',
          meta_description: 'Professional services with expert team and satisfaction guarantee.',
          meta_keywords: 'professional services, expert team, satisfaction guarantee'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSEOData();
  }, [projectId, pageUrl]);

  return { seoData, isLoading, error };
};
