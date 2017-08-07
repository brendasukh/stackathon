const router = require('express').Router()
const fs = require('fs');
const path = require('path')
const request = require('request-promise');
var imgur = require('imgur');

// var binaryBuffer, buf, data, link, index

  var options = {
    method: 'POST',
    uri:'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
    body: {'url' : 'http://i.imgur.com/7SpSlkC.jpg'},
    headers: {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.MS_SUBSCRIPTION_KEY },
    json: true
  };

  function anotherOne(inputObj){
    var highest={value: 0, key: ''}
    for (var element in inputObj){
      if (inputObj[element]>highest.value && element !== 'neutral'){
        highest.value = (inputObj[element])
        highest.key=(element)

      }
    }
    return highest;
  }

router.post('/', (req, res, next) => {
  const data= req.body.image.replace(/^data:image\/(png|jpeg);base64,/, "");
  // const buf = new Buffer(data, 'base64');
  // const binaryBuffer = new Buffer(buf, 'binary');
  imgur.uploadBase64(data)
  .then(function (json) {
    var link = json.data.link;
    options.body.url = link
    return request(options)
  })
  .then((apiResult) => {
    return anotherOne(apiResult[0].scores)
  })
  .then((emotion) => {
    res.send(emotion.key);
  })
  .catch( (err) => {
    console.error("Api fetch failed", err);
    res.send('nothing')
  });
})


module.exports = router;
