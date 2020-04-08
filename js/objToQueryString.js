 /**
   *  Convert a parameters object into a query string, joined by the `&` char
   * { paramOne: 'hello', paramTwo: 'goodbye' }
   * @param {Object} params
   */
  module.exports.objToQueryString = function(params) {
    // '&paramOne=hello&paramTwo=goodbye
    return Object.entries(params) // [['paramOne', 'hello'], ['paramTwo', 'goodbye]]
      .filter(([, value]) => {
        if (value === undefined) return false;
        else return true;
      })
      .map(([key, value]) => {
        return `${key}=${value}`; // ['paramOne=hello', 'paramTwo=goodbye']
      })
      .join("&"); // 'paramOne=hello&paramTwo=goodBye'
  }
