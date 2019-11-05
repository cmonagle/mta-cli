const rl = require('readline');
const fs = require('fs');
/**
 *
 * @param {string} file
 * @param {(arg0: string) => void} lineReader
 */
async function fileStreamer (
  file,
  lineReader
) {
  return new Promise((resolve, reject) => {
    const fileStream = rl.createInterface({
      input: fs.createReadStream(file)
    });

    fileStream
      .on('line', lineReader)
      .on('error', () => reject(
        new Error('Error parsing stops.txt file')
      ))
      .on('close', resolve);
  });
}
module.exports = {
  fileStreamer
};
