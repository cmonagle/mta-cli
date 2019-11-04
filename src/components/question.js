const { prompt } = require('../clients/prompt');
/**
 *
 * @param {Network} network - the transit network
 * @param {function} lineSelectedHandler - handler/cb with response

 * @returns {void}
 */
async function question (network) {
  return prompt(`${network.name}: Please Select a transit line: \n${network.lines.join('\n')}\n`);
}
module.exports = question;
