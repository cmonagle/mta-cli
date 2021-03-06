const { distance: calculateDistance } = require('./utils/geo');
const { fileStreamer: defaultFileStreamer } = require('./clients/io');
const { STOPS_FILE_LOC } = require('./constants');
const path = require('path');
/**
 *
 * @param {StopData} stop
 * @param {StopData[]} stops
 * @returns {FurthestStop}
 */
function findFurthestStop (stop, stops) {
  return stops.reduce((furthest, stopToCompare) => {
    const distance = calculateDistance(stop.coordinates, stopToCompare.coordinates);
    if (distance > furthest.distance) {
      return {
        name: stopToCompare.name,
        distance
      };
    }
    return furthest;
  }, { ...stop.furthestStop });
}

/**
 * @typedef {Object} StopData
 * @property {string} id - id number
 * @property {string} name - stop name
 * @property {number[]} coordinates - x, y coordinates of stop
 * @property {FurthestStop} furthestStop - name of further stop

 * @typedef {Object} FurthestStop
 * @property {number} distance
 * @property {string} name

 * @param {string} line
 * @returns {StopData}
 */
function lineParser (line) {
  const [
    id,
    name,
    x,
    y
  ] = line.split(',');

  return {
    name,
    id,
    coordinates: [x, y].map(Number),
    furthestStop: {
      name: '',
      distance: 0
    }
  };
}
/**
 * note line here means the file line, not the transit line
 * @typedef {Object} LineHandler
 * @property {(arg0: string) => void} lineReader - function to process lines
 * @property {StopData[]} stops - transformed stop data
 *
 * @param {string[]} stopIds
 * @returns {LineHandler}
 */
function lineHandler (stopIds) {
  /** @type {StopData[]} */
  const stops = [];
  const lineReader = /**
   * @param {string} line
   */
 function (line) {
   const stopToCompare = lineParser(line);
   stopIds.forEach((id, i) => {
     if (stopToCompare.id === id) {
       stops.push(stopToCompare);
       stopIds.splice(i, 1);
     }
   });
 };

  return { lineReader, stops };
}

/**
 *
 * @param {import('./Line').Line} line
 * @returns {Promise<StopData[]>}
 */

async function getStops (line, fileStreamer = defaultFileStreamer) {
  const {
    stops,
    lineReader
  } = lineHandler(line.stops);
  await fileStreamer(path.join(__dirname, STOPS_FILE_LOC), lineReader);

  return stops.map(stop => {
    stop.furthestStop = findFurthestStop(stop, stops);
    return stop;
  });
}

module.exports = {
  getStops
};
