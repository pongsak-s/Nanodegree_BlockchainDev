
fs = require('fs');

//read file buffer
imgBuffer = fs.readFileSync('milk.jpeg');
console.log('imgBuffer', imgBuffer);

//encode image
hexImage = new Buffer(imgBuffer).toString('hex');
console.log('hexImage', hexImage);

reverseImgage = new Buffer(hexImage, 'hex');
fs.writeFileSync('decodedImage.jpeg', reverseImgage);
