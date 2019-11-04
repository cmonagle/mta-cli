const getRequest = require('./clients/http');

function flatten (boroughs) {
  return boroughs.reduce((acc, value) => {
    acc.push(...value.stations);
    return acc;
  }, []);
}

/**
 * @typedef {object} Line
 * @property {number[]} stops - stop IDs on this line
 * @property {string} name - name of this subway line
 *
 * @param {string} line - subway line
 * @returns {Line} - array of stops on this line
 */
async function getLines (line, get = getRequest) {
  const results = await get(`http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getStationsByLine/${line}`);

  return {
    name: line,
    stops: flatten(results).map(stop => stop.id)
  };
}

module.exports = {
  getLines
};
