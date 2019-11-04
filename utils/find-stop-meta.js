const readline = require('readline');
const fs = require('fs');

const STOPS_FILE_LOC = '../fixtures/stops.txt';

function handleLineFactory (stopIds) {
    const results = [];
    
    const lineReader = function (line) {

        stopIds.forEach((id, i) => {
            if (line.startsWith(id)) {
                results.push({
                    id,
                    values: line.split(',')
                });
                stopIds.splice(i, 1);
            }
        });
    };
    
    return { lineReader, results };
}

module.exports = async function (stopIds) {
    return new Promise((resolve, reject) => {
        const stopsReader = readline.createInterface({
            input: fs.createReadStream(`${__dirname}/${STOPS_FILE_LOC}`)
        });
        
        const { lineReader, results } = handleLineFactory(stopIds);
        
        stopsReader
        .on('line', lineReader)
        .on('close', () => resolve(results))
    })
};


