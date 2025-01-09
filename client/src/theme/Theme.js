// src/theme/solarEclipseTheme.js
import { createTheme } from '@mui/material/styles';

const solarEclipseColors = {
  base: '#0d0c0f', // Deep black-purple background
  surface: '#1b1a21', // Charcoal surface
  accent: '#f39c12', // Solar gold
  vividRed: '#e74c3c', // Vivid red
  electricBlue: '#3498db', // Electric blue
  textPrimary: '#ecf0f1', // Light gray for primary text
  textSecondary: '#95a5a6', // Muted silver for secondary text
  error: '#c0392b', // Crimson red for errors
  warning: '#f1c40f', // Bright yellow for warnings
  success: '#2ecc71', // Vibrant green for success
  info: '#9b59b6', // Soft purple for info
  overlay: '#2c3e50', // Dark overlay
};

const solarEclipseTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: solarEclipseColors.base,
      paper: solarEclipseColors.surface,
    },
    primary: {
      main: solarEclipseColors.accent,
    },
    secondary: {
      main: solarEclipseColors.electricBlue,
    },
    error: {
      main: solarEclipseColors.error,
    },
    warning: {
      main: solarEclipseColors.warning,
    },
    info: {
      main: solarEclipseColors.info,
    },
    success: {
      main: solarEclipseColors.success,
    },
    text: {
      primary: solarEclipseColors.textPrimary,
      secondary: solarEclipseColors.textSecondary,
    },
  },
  MuiCssBaseline: {
    styleOverrides: `
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap');
      body {
        background: radial-gradient(circle, #0d0c0f 0%, #1b1a21 100%);
        color: ${solarEclipseColors.textPrimary};
      }
    `,
  },
  typography: {
    fontFamily: '"Roboto", "Orbitron", "Arial", sans-serif',
    h1: {
      fontFamily: '"Orbitron", sans-serif',
      fontSize: '3.2rem',
      fontWeight: 700,
      color: solarEclipseColors.accent,
    },
    h2: {
      fontFamily: '"Orbitron", sans-serif',
      fontSize: '2.8rem',
      fontWeight: 700,
      color: solarEclipseColors.electricBlue,
    },
    body1: {
      fontSize: '1rem',
      color: solarEclipseColors.textPrimary,
    },
    body2: {
      fontSize: '0.875rem',
      color: solarEclipseColors.textSecondary,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: solarEclipseColors.surface,
          borderBottom: `3px solid ${solarEclipseColors.accent}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 'bold',
          borderRadius: '8px',
          boxShadow: `0px 4px 10px ${solarEclipseColors.accent}`,
          '&:hover': {
            boxShadow: `0px 6px 12px ${solarEclipseColors.vividRed}`,
          },
        },
      },
    },
  },
});

export default solarEclipseTheme;
