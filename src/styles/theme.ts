export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#8e8e93',
    background: '#ffffff',
    backgroundSecondary: '#fafafa',
    border: '#f0f0f0',
    borderLight: '#e0e0e0',
    text: '#000000',
    textSecondary: '#666666',
    activeBackground: '#f0f8ff',
  },
  
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      small: '12px',
      medium: '14px',
      regular: '16px',
      large: '17px',
      xlarge: '18px',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '32px',
    xxxl: '40px',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  
  layout: {
    maxWidth: '500px',
    headerHeight: '60px',
    tabBarHeight: '80px',
  },
  
  transition: {
    default: 'all 0.2s ease',
  },
  
  shadows: {
    default: '0 0 20px rgba(0,0,0,0.1)',
  },
} as const;