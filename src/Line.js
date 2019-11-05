const { STATIONS_ENDPOINT } = require('./constants');

const getRequest = require('./clients/http');

/**
 *
 * @param {{stations: object[]}[]} boroughs
 */
function flatten (boroughs) {
  return boroughs.reduce((acc, value) => {
    acc.push(...value.stations);
    return acc;
  }, []);
}

/**
 * @typedef {object} Line
 * @property {string[]} stops - stop IDs on this line
 * @property {string} name - name of this subway line
 *
 * @param {string} line - subway line
 * @returns {Promise<Line>} - array of stops on this line
 */
async function getLines (line, get = getRequest) {
  const results = await get(`${STATIONS_ENDPOINT}/${line}`);

  return {
    name: line,
    stops: flatten(results).map(stop => stop.id)
  };
}

module.exports = {
  getLines
};
