
import { useState, useEffect } from 'react';
import { httpFile } from '../config.js';
import { useProjectId } from './useProjectId.js';

export const useFooterData = () => {
  const [footerData, setFooterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const projectId = useProjectId();

  useEffect(() => {
    const fetchFooterData = async () => {
      if (!projectId) return;
      
      try {
        setIsLoading(true);
        
        const { data } = await httpFile.post("/webapp/v1/getfooter", {
          projectId: projectId
        });

        if (data) {
          setFooterData(data);
        }
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, [projectId]);

  return { footerData, isLoading, error };
};
