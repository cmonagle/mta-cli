const { getNetwork } = require('./Network');
const { getLines } = require('./Line');
const { getStops } = require('./Stop');
const question = require('./components/question');
const showStops = require('./components/stops');

async function main () {
  const network = await getNetwork();
  const lineName = await question(network);
  const line = await getLines(lineName);
  const stops = await getStops(line);
  console.log(`Stops on line ${line.name}`);
  console.log(showStops(stops));
  process.exit();
}

main();
