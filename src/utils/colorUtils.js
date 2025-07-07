
export const getThemeGradient = (theme, colors) => {
  if (colors && colors.gradient) {
    return colors.gradient;
  }
  
  // Fallback gradients per theme
  const gradients = {
    cleaning: 'from-green-600 to-emerald-600',
    plumbing: 'from-blue-600 to-cyan-600', 
    hvac: 'from-orange-600 to-red-600',
    roofing: 'from-slate-600 to-gray-600',
    painting: 'from-purple-600 to-pink-600'
  };
  
  return gradients[theme] || gradients.cleaning;
};

export const getThemeTextGradient = (theme, colors) => {
  const gradient = getThemeGradient(theme, colors);
  return `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`;
};

export const getThemeButtonColors = (theme, colors) => {
  if (colors) {
    return {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent
    };
  }
  
  // Fallback colors per theme
  const buttonColors = {
    cleaning: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399'
    },
    plumbing: {
      primary: '#3B82F6', 
      secondary: '#1E40AF',
      accent: '#60A5FA'
    },
    hvac: {
      primary: '#EA580C',
      secondary: '#DC2626', 
      accent: '#F97316'
    },
    roofing: {
      primary: '#64748B',
      secondary: '#475569',
      accent: '#94A3B8'
    },
    painting: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#A855F7'
    }
  };
  
  return buttonColors[theme] || buttonColors.cleaning;
};

export const applyDynamicColors = (element, colors, theme) => {
  if (!element || !colors) return;
  
  const themeColors = getThemeButtonColors(theme, colors);
  
  // Apply inline styles for immediate color changes
  element.style.setProperty('--theme-primary', themeColors.primary);
  element.style.setProperty('--theme-secondary', themeColors.secondary);
  element.style.setProperty('--theme-accent', themeColors.accent);
};
