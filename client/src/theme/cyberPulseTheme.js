// src/theme/cyberPulseTheme.js
import { createTheme } from '@mui/material/styles';

const cyberPulseColors = {
  base: '#121212', // Deep dark background
  surface: '#1e1e1e', // Dark gray surface
  accent: '#08fdd8', // Electric teal
  vibrantPurple: '#9b5de5', // Vibrant purple
  neonOrange: '#ff9f1c', // Neon orange
  textPrimary: '#e0e0e0', // Light gray for primary text
  textSecondary: '#a1a1a1', // Muted gray for secondary text
  error: '#f65151', // Vivid red for errors
  warning: '#ffb400', // Bright yellow-orange for warnings
  success: '#06d6a0', // Bright green for success
  info: '#3a86ff', // Neon blue for info
  overlay: '#292929', // Subtle overlay
};

const cyberPulseTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: cyberPulseColors.base,
      paper: cyberPulseColors.surface,
    },
    primary: {
      main: cyberPulseColors.accent,
    },
    secondary: {
      main: cyberPulseColors.vibrantPurple,
    },
    error: {
      main: cyberPulseColors.error,
    },
    warning: {
      main: cyberPulseColors.warning,
    },
    info: {
      main: cyberPulseColors.info,
    },
    success: {
      main: cyberPulseColors.success,
    },
    text: {
      primary: cyberPulseColors.textPrimary,
      secondary: cyberPulseColors.textSecondary,
    },
  },
  MuiCssBaseline: {
    styleOverrides: `
      @import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Inter:wght@300;400;600;700&display=swap');
      body {
        background: radial-gradient(circle, #121212 0%, #1e1e1e 100%);
        color: ${cyberPulseColors.textPrimary};
      }
    `,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Russo One", sans-serif',
      fontSize: '3.2rem',
      fontWeight: 700,
      color: cyberPulseColors.accent,
    },
    h2: {
      fontFamily: '"Russo One", sans-serif',
      fontSize: '2.8rem',
      fontWeight: 700,
      color: cyberPulseColors.vibrantPurple,
    },
    body1: {
      fontSize: '1rem',
      color: cyberPulseColors.textPrimary,
    },
    body2: {
      fontSize: '0.875rem',
      color: cyberPulseColors.textSecondary,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: cyberPulseColors.surface,
          borderBottom: `2px solid ${cyberPulseColors.accent}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 'bold',
          borderRadius: '10px',
          boxShadow: `0px 4px 10px ${cyberPulseColors.accent}`,
          '&:hover': {
            boxShadow: `0px 6px 15px ${cyberPulseColors.vibrantPurple}`,
          },
        },
      },
    },
  },
});

export default cyberPulseTheme;
