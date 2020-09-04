const chalk = require('chalk');
const fs = require('fs');
const shell = require('shelljs');

/**
 * Takes the config and turns the items into a JSON file.
 *
 * @param {Object} config The config object
 */
module.exports = (config) => {
  if (!config.outputPath || (typeof config.outputPath === 'object' && !('json' in config.outputPath))) {
    console.log(chalk.red("Please add an 'outputPath' option for JSON to your config."));
    console.log(chalk.blue('Exiting.'));

    return;
  }

  if (!config.items) {
    return;
  }

  let json = {};

  for (const [key, value] of Object.entries(config.items)) {
    if (!value.output.includes('json')) {
      continue;
    }

    json[key] = value.items;
  }

  if (!Object.keys(json).length) {
    return;
  }

  if (!config.outputPath.json) {
    return;
  }

  if (!fs.existsSync(config.outputPath.json)) {
    shell.exec(`mkdir -p ${config.outputPath.json.replace(/[^\/]*$/, '')}`);
  }

  fs.writeFileSync(config.outputPath.json, JSON.stringify(json));
};
