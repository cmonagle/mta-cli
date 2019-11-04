function printStops (stops) {
  return stops.map(
    ({ id, name, furthestStop, coordinates }) =>
            `${name} (${id}): ${coordinates.join('/')} ➡ ${furthestStop.name}`
  )
    .join('\n');
}

module.exports = printStops;
