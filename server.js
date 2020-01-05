const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const app = express();

app.use(expressStaticGzip('build', {
  enableBrotli: true,
  customCompressions: [{
    encodingName: 'deflate',
    fileExtension: 'zz',
  }],
  orderPreference: ['br'],
}));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Betika livescore is now running at port 5000');
});
