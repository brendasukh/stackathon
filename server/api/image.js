const router = require('express').Router()
const fs = require('fs');
const path = require('path')
const request = require('request-promise');


var index = 1;

router.post('/', (req, res, next) => {
  const imageName = 'test' + index + '.png';
  var data= req.body.image.replace(/^data:image\/(png|jpg);base64,/, "");
  var buf = new Buffer(data, 'base64');
  fs.writeFile(path.join(__dirname, `../../public/images/${imageName}`), buf,  (err) => {
    if(err){
      res.send('Failure');
      throw err;
    }
    res.send('Success');
  })
})

var options = {
  method: 'POST',
  uri:'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  body: {"url": "http://clipart-library.com/images/dc9rGngoi.jpg"},
  headers: {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': 'API_KEY' },
  json: true
};

request(options)
  .then((apiResult) => {
    console.log(apiResult)
  })
  .catch( (err) => {
    console.log("Api fetch failed", err);
  });

module.exports = router;
