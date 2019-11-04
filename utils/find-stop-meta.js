const readline = require('readline');
const fs = require('fs');
const {distance: calculateDistance} = require('./geo');
/**
 * @typedef {Object} StopData
 * @property {number} id - id number 
 * @property {string} name - stop name
 * @property {float[]} coordinates - x, y coordinates of stop
 * @property {FurthestStop } furthestStop - name of further stop

 * @typedef {Object} FurthestStop
 * @property {number} distance
 * @property {string} name

 * @param {string} line 
 * @returns {StopData}
 */
function lineFormatter(line) {
    const [
        id,
        name,
        x,
        y
    ] = line.split(',');
    return {
        name,
        id,
        coordinates: [x, y],
        furthestStop: {
            name: '',
            distance: 0
        }
    }
}
const STOPS_FILE_LOC = '../fixtures/stops.txt';
/**
 * @typedef {Object} LineHandler
 * @property {function} lineReader - function to process lines
 * @property {StopData[]} results - transformed stop data
 * 
 * @param {string[]} stopIds 
 * @returns {LineHandler}
 */
function handleLineFactory (stopIds) {
    const stopsOnLine = [];
    const lineReader = function (line) {
        const stopToCompare = lineFormatter(line);

        stopIds.forEach((id, i) => {
            if (stopToCompare.id === id) {
                stopsOnLine.push(stopToCompare);
                stopIds.splice(i, 1);
            }
        });
    };

    return { lineReader, stopsOnLine };
}
/**
 * 
 * @param {StopData[]} stops 
 * @returns {StopData[]} 
 * 
 * @TODO mutation bad
 */
function findFurthestStops(stops) {
    return stops.map(stop => {
        stop.furthestStop = stops.reduce((furthest, stopToCompare) => {
            const distance = calculateDistance(stop.coordinates, stopToCompare.coordinates);
            if (distance > furthest.distance) {
                return {
                    name: stopToCompare.name,
                    distance
                }
            }
            return furthest;
        }, stop.furthestStop)
        return stop;
    })
}

module.exports = async function (stopIds) {
    return new Promise((resolve, reject) => {

        const stopsReader = readline.createInterface({
            input: fs.createReadStream(`${__dirname}/${STOPS_FILE_LOC}`)
        });

        const { lineReader, stopsOnLine } = handleLineFactory(stopIds);

        stopsReader
            .on('line', lineReader)
            .on('error', () => reject(
                new Error('Error parsing stops.txt file')
            ))
            .on('close', () => resolve(findFurthestStops(stopsOnLine)))
    });
};


