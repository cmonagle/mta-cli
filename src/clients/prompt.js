const rl = require('readline');

const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = (questionText) => new Promise(resolve => {
  readLine.question(
    questionText,
    resolve
);

})
module.exports = { prompt };
