// src/theme/index.ts
export const theme = {
  colors: {
    // Premium Dark Blues & Grays
    primary: '#1E3A5F',      // Deep Navy Blue
    primaryDark: '#0F2238',   // Darker Navy
    primaryLight: '#2C4F7C',  // Lighter Navy
    
    // Accent Colors - Gold/Champagne for premium feel
    accent: '#D4AF37',        // Champagne Gold
    accentDark: '#B8941F',    // Darker Gold
    accentLight: '#E6C757',   // Light Gold
    
    // Background Colors
    background: '#0A0E1A',    // Very Dark Blue-Black
    surface: '#141B2D',       // Dark Blue-Gray
    card: '#1A2236',          // Card Background
    
    // Text Colors
    textPrimary: '#FFFFFF',   // Pure White
    textSecondary: '#B8C5D6', // Light Blue-Gray
    textMuted: '#718096',     // Muted Gray
    
    // Status Colors
    success: '#34D399',       // Emerald Green
    warning: '#F59E0B',       // Amber
    error: '#EF4444',         // Red
    info: '#3B82F6',          // Blue
    
    // Subscription Tiers
    tierPlatinum: '#E5E4E2',  // Platinum
    tierGold: '#FFD700',      // Gold
    tierSilver: '#C0C0C0',    // Silver
    tierBronze: '#CD7F32',    // Bronze
    
    // Borders and Dividers
    border: '#2D3748',        // Dark Gray
    divider: '#1A202C',       // Darker Gray
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
      xxxl: 40,
    },
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
};