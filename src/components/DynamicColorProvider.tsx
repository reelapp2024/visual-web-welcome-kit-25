
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
    button: string;
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

  // Helper function to check if a color is a gradient
  const isGradient = (color: string) => {
    return color.includes('linear-gradient') || color.includes('radial-gradient');
  };

  // Helper function to extract hex color from gradient or return original color
  const extractColorFromGradient = (color: string) => {
    if (isGradient(color)) {
      // Extract first hex color from gradient
      const hexMatch = color.match(/#[0-9a-fA-F]{6}/);
      return hexMatch ? hexMatch[0] : '#3B82F6'; // fallback to blue
    }
    return color;
  };

  // Convert hex to HSL for Tailwind CSS variables
  const hexToHsl = (hex: string) => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

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

  // Apply CSS custom properties for dynamic colors
  useEffect(() => {
    if (!isLoading && colors) {
      console.log('Applying colors to CSS custom properties:', colors);
      const root = document.documentElement;
      
      // Handle primary color (could be gradient or hex)
      if (isGradient(colors.primary)) {
        root.style.setProperty('--primary-gradient', colors.primary);
        root.style.setProperty('--primary', extractColorFromGradient(colors.primary));
      } else {
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--primary-gradient', colors.primary);
      }

      // Handle secondary color (could be gradient or hex)
      if (isGradient(colors.secondary)) {
        root.style.setProperty('--secondary-gradient', colors.secondary);
        root.style.setProperty('--secondary', extractColorFromGradient(colors.secondary));
      } else {
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--secondary-gradient', colors.secondary);
      }

      // Set other colors directly
      root.style.setProperty('--accent', colors.accent);
      root.style.setProperty('--background', colors.background);
      root.style.setProperty('--foreground', colors.foreground);
      root.style.setProperty('--muted', colors.muted);
      root.style.setProperty('--border', colors.border);
      root.style.setProperty('--destructive', colors.destructive);
      root.style.setProperty('--button', colors.button);
      root.style.setProperty('--success', colors.success);
      root.style.setProperty('--warning', colors.warning);
      root.style.setProperty('--info', colors.info);

      // Convert hex colors to HSL for Tailwind CSS variables
      const primaryHex = extractColorFromGradient(colors.primary);
      const secondaryHex = extractColorFromGradient(colors.secondary);
      const accentHex = colors.accent;

      root.style.setProperty('--primary-hsl', hexToHsl(primaryHex));
      root.style.setProperty('--secondary-hsl', hexToHsl(secondaryHex));
      root.style.setProperty('--accent-hsl', hexToHsl(accentHex));
      root.style.setProperty('--background-hsl', hexToHsl(colors.background));
      root.style.setProperty('--foreground-hsl', hexToHsl(colors.foreground));
      root.style.setProperty('--muted-hsl', hexToHsl(colors.muted));
      root.style.setProperty('--border-hsl', hexToHsl(colors.border));
      
      console.log('CSS custom properties applied successfully');
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
