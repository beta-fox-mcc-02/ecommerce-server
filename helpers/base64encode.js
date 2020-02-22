const fs = require('fs');

function base64_encode(file) {
  console.log(file);
  return fs.readFileSync(file, { encoding: 'base64' });
  // const b = new Buffer(file);
  // return b.toString('base64');
}

module.exports = base64_encode;
