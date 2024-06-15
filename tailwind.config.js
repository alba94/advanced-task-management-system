const TAILWIND_PLUGINS = [require('@tailwindcss/forms')];

/** @type {import('tailwindcss').Config} */ export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray: {
        lighter: '#F7F7F8',
        light: '#EDEEF2',
        DEFAULT: '#DADBDF',
        dark: '#B0B0B0',
        darker: '#636363',
      },
      primary: {
        lighter: '#DEE7F8',
        light: '#BCD0F0',
        DEFAULT: '#2570EA',
        dark: '#1F498E',
      },
      secondary: {
        lighter: '#EEE1FF',
        light: '#DEC4FF',
        DEFAULT: '#9747FF',
        dark: '#6730AD',
      },
      success: {
        lighter: '#E1FCE7',
        light: '#C4FAD0',
        DEFAULT: '#47EF6C',
        dark: '#2CAC49',
      },
      danger: {
        lighter: '#FADBE5',
        light: '#F5B8CA',
        DEFAULT: '#DF215A',
        dark: '#BA2853',
      },
      info: {
        lighter: '#FFFBEC',
        light: '#FFF7D9',
        DEFAULT: '#FFE589',
        dark: '#F2AE2A',
      },
    },
    extend: {
      fontFamily: { body: ['"Sofia Pro"', 'sans-serif'] },
      container: { center: true, padding: '2rem', screens: {} },
    },
  },
  plugins: [...TAILWIND_PLUGINS],
  corePlugins: { preflight: false },
  important: true
};
