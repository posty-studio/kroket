const colors = {
  primary: '#ff00ff',
  light: '#ffffff',
  dark: '#252525',
};

const fonts = {
  base: 'Helvetica, sans-serif',
  serif: 'Georgia, serif',
};

const sizes = {
  300: '0.8rem',
  400: '1rem',
  500: '1.25rem',
  600: '1.56rem',
  700: '1.95rem',
  800: '2.44rem',
  900: '3.05rem',
};

module.exports = {
  outputPath: {
    sass: {
      config: 'src/scss/_config.scss',
      utilities: 'src/scss/_utilities.scss',
    },
    json: 'build/tokens.json',
  },
  items: {
    color: {
      items: colors,
      output: ['sass', 'json'],
    },
    size: {
      items: sizes,
      output: ['sass', 'json'],
    },
  },
  breakpoints: {
    sm: '(min-width: 32em)',
    md: '(min-width: 48em)',
    lg: '(min-width: 68em)',
  },
  utilities: {
    'bg': {
      items: colors,
      output: 'standard',
      property: 'background',
    },
    'color': {
      items: colors,
      output: 'standard',
      property: 'color',
    },
    'font': {
      items: fonts,
      output: 'standard',
      property: 'font-family',
    },
    'gap-top': {
      items: sizes,
      output: 'standard',
      property: 'margin-top',
    },
    'gap-bottom': {
      items: sizes,
      output: 'standard',
      property: 'margin-bottom',
    },
    'leading': {
      items: {
        tight: '1.2',
        mid: '1.5',
        loose: '1.7',
      },
      output: 'standard',
      property: 'line-height',
    },
    'measure': {
      items: {
        long: '75ch',
        short: '60ch',
        compact: '40ch',
      },
      output: 'standard',
      property: 'max-width',
    },
    'text': {
      items: sizes,
      output: 'responsive',
      property: 'font-size',
    },
    'weight': {
      items: {
        light: '300',
        regular: '400',
        mid: '600',
        bold: '700',
      },
      output: 'standard',
      property: 'font-weight',
    },
  },
};
