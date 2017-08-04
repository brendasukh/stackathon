const router = require('express').Router()
const fs = require('fs');
const path = require('path')
const request = require('request-promise');


var index = 1;
var binaryBuffer
router.post('/', (req, res, next) => {
  const imageName = 'test' + index + '.png';
  var data= req.body.image.replace(/^data:image\/(png|jpg);base64,/, "");
  var buf = new Buffer(data, 'base64');
  //binaryBuffer = new Buffer(buf, 'binary')
  
  // var binaryBuffer = new Buffer(buf, 'binary')
  fs.writeFile(path.join(__dirname, `../../public/images/${imageName}`), buf,  (err) => {
    if(err){
      res.send('Failure');
      throw err;
    }
    res.send('Success');
  })
})
binaryBuffer = fs.createReadStream(path.join(__dirname, '../../public/images/img1.png'), {encoding: 'binary'})
console.log('binaryBuffer', Object.keys(binaryBuffer))
var buffer = new Buffer (binaryBuffer, 'binary')
//console.log('binary buffer here!', binaryBuffer)
var options = {
  method: 'POST',
  uri:'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  body: buffer,
  headers: {'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': '6f7761f334d64fd6858be9240a806eb9' },
  json: true
};

request(options)
  .then((apiResult) => {
    //console.log(apiResult)
  })
  .catch( (err) => {
    console.log("Api fetch failed");
  });

module.exports = router;
