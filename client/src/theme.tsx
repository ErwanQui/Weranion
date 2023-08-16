import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    brown: Palette['primary'];
    sandyBrown: Palette['primary'];
  }

  interface PaletteOptions {
    brown?: PaletteOptions['primary'];
    sandyBrown?: PaletteOptions['primary'];
  }
}

//Button
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    brown: true;
    sandyBrown: true;
  }
}

//TextField
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    brown: true;
    sandyBrown: true;
  }
}

const theme = createTheme({
  palette: {
    brown: {
      main: '#9b471c',
      light: '#AC4F20',
      dark: '#8A3F19',
      contrastText: '#FFF',
    },
    sandyBrown: {
      main: '#30011E',
      light: '#F3B87C',
      dark: '#EC8F32',
      contrastText: '#000',
    },
  },
});

export default theme;