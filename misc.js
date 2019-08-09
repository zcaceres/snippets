import _ from 'lodash'

export function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const isNumber = (v) => !isNaN(parseFloat(v))

/**
 * If a object can be parsed as an obj, convert to obj.
 * Otherwise just return the string.
 * @param {String} str
 */
const convertStrToObject = str => {
  try {
    const obj = JSON.parse(str)
    return obj
  } catch (e) {
    return str
  }
}

