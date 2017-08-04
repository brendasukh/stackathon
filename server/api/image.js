const router = require('express').Router()
const fs = require('fs');
const path = require('path')
const request = require('request-promise');


var index = 1;
var binaryBuffer, buf
router.post('/', (req, res, next) => {
  const imageName = 'test' + index + '.jpg';
  var data= req.body.image.replace(/^data:image\/(png|jpeg);base64,/, "");
  buf = new Buffer(data, 'base64');
  binaryBuffer = new Buffer(buf, 'binary')
  
  // var binaryBuffer = new Buffer(buf, 'binary')
  fs.writeFile(path.join(__dirname, `../../public/images/${imageName}`), buf,  (err) => {
    if(err){
      res.send('Failure');
      throw err;
    }
    res.send('Success');
  })
})
// binaryBuffer = fs.readFileSync(path.join(__dirname, '../../public/images/img1.png'))
// binaryBuffer = fs.createReadStream(p)
// console.log('binaryBuffer', Object.keys(binaryBuffer))
// var buffer = new Buffer (binaryBuffer, 'binary')
//console.log('binary buffer here!', binaryBuffer)
var options = {
  method: 'POST',
  uri:'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  body: {url: ''},
  headers: {'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': 'key goes here' },
  json: true
};

// request(options)
//   .then((apiResult) => {
//     console.log(apiResult)
//   })
//   .catch( (err) => {
//     console.log("Api fetch failed", err);
//   });

module.exports = router;
