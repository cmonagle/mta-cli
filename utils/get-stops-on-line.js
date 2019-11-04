const get = require('./get');
const findStopMeta = require('./find-stop-meta');
function transformStops (stop) {

}

function flatten (boroughs) {
  return boroughs.reduce((acc, value) => {
    acc.push(...value.stations);
    return acc;
  }, [])
}

module.exports = async function (line) {
  const results = await get(`http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getStationsByLine/${line}`);
  
  const stopIds = flatten(results).map(stop => stop.id);
  const fullerData  = await findStopMeta(stopIds);
  return fullerData;
};
