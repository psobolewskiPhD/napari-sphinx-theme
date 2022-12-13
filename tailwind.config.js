/* eslint-disable no-param-reassign */

const { reduce } = require('lodash');
const typography = require('@tailwindcss/typography');
const {
  colors,
  breakpoints,
  fontFamily,
} = require('./src/napari_sphinx_theme/assets/theme');

// Add px unit to all breakpoint values.
const screens = reduce(
  breakpoints,
  (result, value, key) => {
    result[key] = `${value}px`;
    return result;
  },
  {},
);

function pixelsToRem(value) {
  return `${value / 16}rem`;
}

module.exports = {
  prefix: 'tw-',
  mode: 'jit',
  darkMode: 'media',
  content: ['./src/napari_sphinx_theme/**/*.{html,tsx,scss}'],
  plugins: [typography],
  theme: {
    screens,
    extend: {
      fontFamily: {
        barlow: fontFamily,
      },

      spacing: {
        // Use 25px and 50px for margins, paddings, gaps, etc.
        'napari-6': pixelsToRem(25),
        'napari-12': pixelsToRem(50),
      },

      colors: {
        'napari-primary': colors.primary,
        'napari-deep-blue': colors.deepBlue,
        'napari-hover': colors.hover,
        'napari-hover-gray': colors.hoverGray,
        'napari-light': colors.light,
        'napari-error': colors.error,
        'napari-gray': colors.gray,
        'napari-dark-gray': colors.darkGray,

        'hub-gray': {
          100: '#f7f7f7',
          200: '#eaeaea',
          300: '#cccccc',
          400: '#999999',
          500: '#686868',
        },

        'hub-primary': {
          100: '#ecf8ff',
          200: '#d2efff',
          400: '#80d1ff',
          500: '#68c8ff',
          600: '#009BF2',
        },
      },

      width: (theme) => ({
        'napari-min-width': theme('screens.screen-300'),
        'napari-col': '225px',
      }),

      height: {
        'napari-app-bar': '75px',
      },

      gridTemplateColumns: (theme) => {
        const width = theme('width.napari-col');
        const columns = [2, 3, 4, 5];

        return columns.reduce(
          // Add `repeat(225px, $column)` for each column
          (result, count) => {
            result[`napari-${count}`] = `repeat(${count}, ${width})`;
            return result;
          },

          {},
        );
      },

      maxWidth: (theme) => theme('width'),
      minWidth: (theme) => theme('width'),
      minHeight: (theme) => theme('height'),
    },
  },
};
