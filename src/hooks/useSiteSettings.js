import { useState, useEffect } from 'react';
import { httpFile } from '../config.js';

export const useSiteSettings = () => {
  const [siteSettings, setSiteSettings] = useState({
    colors: {
      primary: '#3B82F6',
      secondary: '#64748B', 
      accent: '#10B981',
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#F1F5F9',
      border: '#E2E8F0',
      destructive: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      info: '#3B82F6'
    },
    theme: 'cleaning'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectId = import.meta.env.VITE_PROJECT_ID;

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        setIsLoading(true);
        const { data } = await httpFile.post("/webapp/v1/fetchSiteSettings", {
          projectId
        });
        
        if (data && data.settings) {
          setSiteSettings(prevSettings => ({
            ...prevSettings,
            ...data.settings,
            colors: {
              ...prevSettings.colors,
              ...data.settings.colors
            }
          }));
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
        setError(error);
        // Keep default colors if API fails
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchSiteSettings();
    } else {
      setIsLoading(false);
    }
  }, [projectId]);

  // Theme-specific color defaults
  const getThemeDefaults = (theme) => {
    const themeDefaults = {
      cleaning: {
        primary: '#00FFFF',
        secondary: '#059669', 
        accent: '#34D399',
        gradient: 'from-green-600 to-emerald-600'
      },
      plumbing: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#60A5FA', 
        gradient: 'from-blue-600 to-cyan-600'
      },
      hvac: {
        primary: '#EA580C',
        secondary: '#DC2626',
        accent: '#F97316',
        gradient: 'from-orange-600 to-red-600'
      },
      roofing: {
        primary: '#64748B',
        secondary: '#475569',
        accent: '#94A3B8',
        gradient: 'from-slate-600 to-gray-600'
      },
      painting: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#A855F7',
        gradient: 'from-purple-600 to-pink-600'
      }
    };
    
    return themeDefaults[theme] || themeDefaults.cleaning;
  };

  const getThemeColors = (theme) => {
    const themeDefaults = getThemeDefaults(theme);
    return {
      ...siteSettings.colors,
      ...themeDefaults
    };
  };

  return {
    siteSettings,
    isLoading,
    error,
    getThemeColors,
    getThemeDefaults
  };
};
