#!/usr/bin/env node

const {cosmiconfigSync} = require('cosmiconfig');
const chalk = require('chalk');
const sassGenerator = require('./components/sass-generator.js');
const jsonGenerator = require('./components/json-generator.js');

let config = require('./default/config.js');

const init = () => {
  const userConfig = cosmiconfigSync('kroket', {searchPlaces: ['kroket.config.js']}).search();

  if (userConfig) {
    config = userConfig.config;
  }

  sassGenerator(config);
  jsonGenerator(config);

  console.log(chalk.green('Config and classes generated!'));
};

init();
