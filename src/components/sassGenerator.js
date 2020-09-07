const chalk = require('chalk');
const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const convertJsToSass = require('../helpers/convertJsToSass');
const prettier = require('prettier');

const generateClasses = (utilities, targets, prefix = '') => {
  let response = '';

  for (const [name, data] of Object.entries(utilities)) {
    if (targets.includes(data.output)) {
      for (const [key, value] of Object.entries(data.items)) {
        response += `.${prefix}${name}-${key} {
            ${data.property}: ${value};
        }\n\n`;
      }
    }
  }

  return response;
};

/**
 * Takes the config an optional array of targets and an
 * optional prefix which generates a CSS string of
 * utility classes
 *
 * @param {Object} config The config object.
 * @returns {String}
 */
const generateCssUtilities = (config) => {
  let response = '';

  response += generateClasses(config.utilities, ['standard', 'responsive']);

  if (config.breakpoints) {
    for (const [breakpoint, width] of Object.entries(config.breakpoints)) {
      response += `@media (min-width: ${width}) {
        ${generateClasses(config.utilities, ['responsive'], `${breakpoint}\\:-`)}
      }\n\n`;
    }
  }

  return response;
};

const generateSassConfig = (config) => {
  let sassConfig = {
    items: {},
    breakpoints: {},
    utilities: {},
  };

  if (config.items) {
    for (const [key, value] of Object.entries(config.items)) {
      sassConfig.items[key] = value.items;
    }
  }

  if (config.utilities) {
    for (const [key, value] of Object.entries(config.utilities)) {
      sassConfig.utilities[key] = {};
      sassConfig.utilities[key].items = value.items;
      sassConfig.utilities[key].property = value.property;
    }
  }

  if (config.breakpoints) {
    for (const [key, value] of Object.entries(config.breakpoints)) {
      sassConfig.breakpoints[key] = value;
    }
  }

  return `$kroket-config: ${convertJsToSass(sassConfig)};`;
};

const addMixins = (config) => {
  if (!config.items) {
    return null;
  }

  const items = Object.entries(config.items).filter((item) => item[1].output.includes('sass'));

  if (!items) {
    return null;
  }

  let response = `@function get-item($group, $key) {
        $response: map-get(map-get(map-get($kroket-config, 'items'), $group), $key);

        @if ($response) {
            @return $response;
        }

        @warn #{'Item "' + $key + '" not found in "' + $group + '".'};

        @return null;
    }\n\n`;

  for (const key of Object.keys(config.items)) {
    response += `@function get-${key}($key) {
        @return get-item('${key}', $key);
    }\n\n`;
  }
  const mixins = fs.readFileSync(path.resolve(__dirname, '../sass/mixins.scss'), 'utf8');

  return [response, mixins].join('\n\n');
};

/**
 * Takes the config and turns it into CSS classes and some Sass mixins.
 *
 * @param {Object} config The config object
 */
module.exports = (config) => {
  if (!config.outputPath || (typeof config.outputPath === 'object' && !('sass' in config.outputPath))) {
    console.log(chalk.red("[Kroket] Please add an 'outputPath' option for Sass to your config."));
    console.log(chalk.blue('[Kroket] Exiting.'));

    return;
  }

  if (config.outputPath.sass.config) {
    if (!fs.existsSync(config.outputPath.sass.config)) {
      shell.exec(`mkdir -p ${config.outputPath.sass.config.replace(/[^\/]*$/, '')}`);
    }

    fs.writeFileSync(
      config.outputPath.sass.config,
      prettier.format([generateSassConfig(config), addMixins(config)].join('\n\n'), {parser: 'scss'})
    );
  }

  if (config.outputPath.sass.utilities) {
    if (!fs.existsSync(config.outputPath.sass.utilities)) {
      shell.exec(`mkdir -p ${config.outputPath.sass.utilities.replace(/[^\/]*$/, '')}`);
    }

    fs.writeFileSync(config.outputPath.sass.utilities, prettier.format(generateCssUtilities(config), {parser: 'scss'}));
  }
};
