# Kroket

Kroket generates tokens and utility classes for your Sass project, as well as a JSON file for your tokens.

*Based on [Gorko](https://github.com/hankchizljaw/gorko) and [Goron](https://github.com/hankchizljaw/goron) by [Andy Bell](https://github.com/hankchizljaw/).*

## Features

### Create Sass and JSON files from your tokens

With Kroket, you can use a single JavaScript file to create Sass and JSON files with your colors, sizes etc. This is ideal if you use these items outside your CSS (for example, in JavaScript or PHP) and want a single source of truth.

#### Sass

```scss
@import 'config';

body {
    background-color: get-color('primary');
}
```

#### JavaScript

```js
const tokens = require('tokens.json');

console.log(tokens.color.primary);
```

#### PHP

```php
$tokens = json_decode(file_get_contents('path/to/tokens.json'), true);

var_dump($tokens['color']['primary']);
```

### Automatically create (responsive) utility classes

Kroket automatically creates utility classes from your config. For example, let's say this is (part of) your config:

```js
const colors = {
  primary: '#ff00ff',
  light: '#ffffff',
  dark: '#252525',
};

const sizes = {
  300: '0.8rem',
  700: '1.95rem',
};

const config = {
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
    'text': {
      items: sizes,
      output: 'responsive',
      property: 'font-size',
    },
};
```

This config will generate the following classes for you:

- `.bg-primary`
- `.bg-light`
- `.bg-dark`
- `.text-300`
- `.text-700`
- `.sm:text-300`
- `.sm:text-700`
- `.md:text-300`
- `.md:text-700`
- `.lg:text-300`
- `.lg:text-700`

### Helpful mixins and functions

Kroket comes with a bunch of helpful Sass mixins and functions. These work especially well with our custom [VS Code extension](https://github.com/posty-studio/vscode-kroket).

```scss
.card {
    @include apply-utility('font', 'heading');

    background-color: get-color('white');

    @include media-query('md') {
        font-size: get-size('500');
        border-top-left-radius: get-utility('radius', 'large');
    }
}
```

## Installation

```
npm install kroket
```

## Usage

### CLI

```
npx kroket
```

### Node

```js
const kroket = require('kroket');

kroket();
```

### Gulp

```js
const kroket = require('kroket');

function runKroket(done) {
    kroket();
    done();
}

function watch() {
    gulp.watch('./kroket.config.js', runKroket);
}

gulp.task('default', gulp.series(runKroket, watch));
```

## Configuration

You can add a file called `kroket.config.js` to the root of your project to customize the output. If you don't specify a file, Kroket uses the default config:

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
