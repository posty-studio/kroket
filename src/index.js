const {cosmiconfigSync} = require('cosmiconfig');
const chalk = require('chalk');
const sassGenerator = require('./components/sassGenerator.js');
const jsonGenerator = require('./components/jsonGenerator.js');

let config = require('./default/config.js');

module.exports = () => {
  const userConfig = cosmiconfigSync('kroket', {searchPlaces: ['kroket.config.js']}).search();

  if (userConfig) {
    config = userConfig.config;
  }

  sassGenerator(config);
  jsonGenerator(config);

  console.log(chalk.green('Config and classes generated!'));
};
