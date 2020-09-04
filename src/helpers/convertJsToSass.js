const {convertStringToNumber} = require('convert-string-to-number');
const isPlainObject = require('lodash.isplainobject');

function convertJsToSass(value) {
  function _convertJsToSass(value, initialIndentLevel = 0) {
    let indentLevel = initialIndentLevel;

    if (typeof value === 'string') {
      const converted = convertStringToNumber(value);

      if (!isNaN(converted)) {
        value = converted;
      }
    }

    switch (typeof value) {
      case 'boolean':
      case 'float':
      case 'number':
        return value;
      case 'string':
        return isCssColor(value) || value.endsWith('px') ? value : `"${strEsc(value)}"`;
      case 'object':
        if (isPlainObject(value)) {
          indentLevel += 1;
          let indent = indentsToSpaces(indentLevel);

          let jsObj = value;
          let sassKeyValPairs = [];

          sassKeyValPairs = Object.keys(jsObj).reduce((result, key) => {
            let jsVal = jsObj[key];
            let sassVal = _convertJsToSass(jsVal, indentLevel);

            if (isNotUndefined(sassVal)) {
              result.push(`"${key}": ${sassVal}`);
            }

            return result;
          }, []);

          let result = `(\n${indent + sassKeyValPairs.join(',\n' + indent)}\n${indentsToSpaces(indentLevel - 1)})`;
          indentLevel -= 1;
          return result;
        } else if (Array.isArray(value)) {
          let sassVals = value
            .map((v) => (isNotUndefined(v) ? _convertJsToSass(v, indentLevel) : null))
            .filter((v) => v !== null);

          return '(' + sassVals.join(', ') + ')';
        } else if (isNull(value)) return 'null';
        else return value.toString();
      default:
        return;
    }
  }

  return _convertJsToSass(value);
}

function indentsToSpaces(indentCount) {
  return Array(indentCount + 1).join('  ');
}

function isNull(value) {
  return value === null;
}

function isCssColor(value) {
  if (value === 'transparent') {
    return true;
  }

  return (
    value.startsWith('#') ||
    value.startsWith('rgb(') ||
    value.startsWith('rgba') ||
    value.startsWith('hsl(') ||
    value.startsWith('hsla(')
  );
}

function isNotUndefined(value) {
  return typeof value !== 'undefined';
}

function strEsc(value) {
  return value.replace(/"/g, '\\"');
}

module.exports = convertJsToSass;
