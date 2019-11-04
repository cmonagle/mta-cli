const get = require('./get');

module.exports = async function () {
  const results = await get('http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getSubwaylines');
  return results.map(line => line.id);
};
