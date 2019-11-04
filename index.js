const rl = require('readline');

const getTrainLines = require('./utils/get-lines');
const getStopsOnLine = require('./utils/get-stops-on-line');

function printStops (stops) {
    return stops.map(
        ({id, name, furthestStop, coordinates}) =>
            `${name} (${id}): ${coordinates.join('/')} ➡ ${furthestStop.name}`
    )
    .join('\n');
}
async function handleTransitLine (line) {
  const stops = await getStopsOnLine(line);
  console.log(`Found ${stops.length} stops\n`, printStops(stops));
  process.exit();
}

async function main () {
  const readLine = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '🚇>'
  });

  const transitLines = await getTrainLines();
  readLine.question(
        `Please Select a transit line: \n${transitLines.join('\n')}\n`,
        handleTransitLine
  );
}

main();
