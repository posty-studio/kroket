# Kroket

Kroket generates tokens and utility classes for your Sass project.

*Based on [Gorko](https://github.com/hankchizljaw/gorko) and [Goron](https://github.com/hankchizljaw/goron) by [Andy Bell](https://github.com/hankchizljaw/).*

## Getting started

Install Kroket:

```
npm install kroket
```

Then run it:

```
kroket
```

## Configuration

You can add a file called `kroket.config.js` to the root of your project to customize the output. If you don't specify a file, Kroket uses the default config:

### Default config

```js
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
    sm: '32em',
    md: '48em',
    lg: '68em',
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
```
