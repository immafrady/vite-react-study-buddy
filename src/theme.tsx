import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useTheme } from '@mui/material';

// A custom theme for this app
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

export default {
  light: lightTheme,
  dark: darkTheme
};
