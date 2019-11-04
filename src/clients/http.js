const https = require('https');
const http = require('http');
const getProtocolMethod = url => url.charAt(4) === 's' ? https : http;

/**
 * For some reason, the response seems to include "undefined" at the beginning
 * also, it's double json encoded some of the time, so we're just gonna keep
 * JSON parsing it until it's not a string
 */

function normaliseAndParseResponse (response) {
  let result = response.replace('undefined', '');
  while (typeof result === 'string') {
    result = JSON.parse(result);
  }
  return result;
}

module.exports = url => new Promise((resolve, reject) => {
  getProtocolMethod(url).get(url, (res) => {
    if (res.statusCode > 200) {
      reject(new Error(`Error fetching ${url}, code ${res.statusCode}`));
    }
    let data;
    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      const toResolve = normaliseAndParseResponse(data);
      resolve(toResolve);
    });
  });
});
