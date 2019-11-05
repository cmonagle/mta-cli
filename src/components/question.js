const { prompt: defaultPrompt } = require('../clients/prompt');
/**
 *
 * @param {Network} network - the transit network
 * @param {function} lineSelectedHandler - handler/cb with response

 * @returns {Promise<string>}
 */
async function question (network, prompt = defaultPrompt) {
  return prompt(`${network.name}: Please Select a transit line: \n${network.lines.join('\n')}\n`);
}
module.exports = question;
