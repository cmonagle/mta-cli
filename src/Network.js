const getRequest = require('./clients/http');
const { LINES_ENDPOINT } = require('./constants');
/**
 * @typedef {object} Network
 * @property {string} name - the name of the transit network
 * @property {string[]} lines - list of lines

 * @param {function} get - HTTP get client
 * @returns {Network}
 */

async function getNetwork (get = getRequest) {
  const results = await get(LINES_ENDPOINT);
  return {
    name: 'MTA Subways',
    lines: results.map(line => line.id)
  };
}

module.exports = {
  getNetwork
};
