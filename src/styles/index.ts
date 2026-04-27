const fontFamily = 'PlusJakartaSans';

export const ZORRRO_COLORS = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRADIENT_LOW: '#F5F1EC',

  primary: {
    DEFAULT: '#103AFE',
    p1: '#313D65',
    p2: '#1A1D2C',
    p3: '#6F6F6F',
    p5: '#161320',
    p6: '#061A48',
  },
};

export const DARK_COLORS = {
  MAIN_BACKGROUND: '#050519',
  MAJOR_BACKGROUND: '#11132B',
  ICON_BOX: '#303355',
  PRIMARY_GRADIENT: '#303355',
  SECONDARY_GRADIENT: '#060624',
  PRIMARY_FONT: '#DBDCDF',
  SECONDARY_FONT: '#C4C4CA',
  MAIN_ICON: '#B6B6B6',
  PRIMARY_BOUNDARY: '#45548F',
};

export const ZORRRO_FONTS = {
  100: {
    normal: `${fontFamily}-Thin`,
    italic: `${fontFamily}-ThinItalic`,
  },
  200: {
    normal: `${fontFamily}-Light`,
    italic: `${fontFamily}-LightItalic`,
  },
  300: {
    normal: `${fontFamily}-ExtraLight`,
    italic: `${fontFamily}-ExtraLightItalic`,
  },
  400: {
    normal: `${fontFamily}-Regular`,
    italic: `${fontFamily}-Italic`,
  },
  500: {
    normal: `${fontFamily}-Medium`,
    italic: `${fontFamily}-MediumItalic`,
  },
  600: {
    normal: `${fontFamily}-SemiBold`,
    italic: `${fontFamily}-SemiBoldItalic`,
  },
  700: {
    normal: `${fontFamily}-Bold`,
    italic: `${fontFamily}-BoldItalic`,
  },
  800: {
    normal: `${fontFamily}-ExtraBold`,
    italic: `${fontFamily}-ExtraBoldItalic`,
  },
  900: {
    normal: `${fontFamily}-Black`,
    italic: `${fontFamily}-BlackItalic`,
  },
};

const CustomTheme = {
  fontConfig: {
    [fontFamily]: {
      100: ZORRRO_FONTS[100],
      200: ZORRRO_FONTS[200],
      300: ZORRRO_FONTS[300],
      400: ZORRRO_FONTS[400],
      500: ZORRRO_FONTS[500],
      600: ZORRRO_FONTS[600],
      700: ZORRRO_FONTS[700],
      800: ZORRRO_FONTS[800],
      900: ZORRRO_FONTS[900],
    },
  },
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily,
  },
};

export default CustomTheme;
