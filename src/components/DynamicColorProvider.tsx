
import React, { createContext, useContext, useEffect } from 'react';
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import { currentTheme } from '../App';

interface ColorContextType {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    destructive: string;
    success: string;
    warning: string;
    info: string;
    gradient: string;
  };
  isLoading: boolean;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within DynamicColorProvider');
  }
  return context;
};

interface DynamicColorProviderProps {
  children: React.ReactNode;
}

export const DynamicColorProvider: React.FC<DynamicColorProviderProps> = ({ children }) => {
  const { siteSettings, isLoading, getThemeColors } = useSiteSettings();
  const colors = getThemeColors(currentTheme);

  // Apply CSS custom properties for dynamic colors
  useEffect(() => {
    if (!isLoading && colors) {
      const root = document.documentElement;
      
      // Convert hex to HSL for CSS variables
      const hexToHsl = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }

        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
      };

      // Set CSS custom properties
      root.style.setProperty('--primary', hexToHsl(colors.primary));
      root.style.setProperty('--secondary', hexToHsl(colors.secondary));
      root.style.setProperty('--accent', hexToHsl(colors.accent));
      root.style.setProperty('--background', hexToHsl(colors.background));
      root.style.setProperty('--foreground', hexToHsl(colors.foreground));
      root.style.setProperty('--muted', hexToHsl(colors.muted));
      root.style.setProperty('--border', hexToHsl(colors.border));
      root.style.setProperty('--destructive', hexToHsl(colors.destructive));
    }
  }, [colors, isLoading]);

  const value: ColorContextType = {
    colors,
    isLoading
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};
