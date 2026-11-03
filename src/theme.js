import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#155EEF',
      dark: '#004EEB',
    },
    secondary: {
      main: '#101828',
    },
    success: {
      main: '#12B76A',
    },
    background: {
      default: '#F7F9FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#101828',
      secondary: '#667085',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.045em',
    },
    h2: {
      fontWeight: 750,
      letterSpacing: '-0.035em',
    },
    h3: {
      fontWeight: 750,
      letterSpacing: '-0.03em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 650,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 18px',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'medium',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 10px rgba(16,24,40,.045)',
        },
      },
    },
  },
});

export default theme;
