const rl = require('readline');

const getTrainLines = require('./utils/get-lines');
const getStopsOnLine = require('./utils/get-stops-on-line');

async function handleTransitLine (line) {
  const stops = await getStopsOnLine(line);
  console.log(`Found ${stops.length} stops`, stops);
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
