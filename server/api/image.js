const router = require('express').Router()
const fs = require('fs');
const path = require('path')
const request = require('request-promise');
var imgur = require('imgur');

function pickEmotion(emotion){
  switch(emotion){
  case 'happiness':
    return 'GOOD JOB YOU\'RE HAPPY!'
  case 'disgust':
    return 'YOU\'RE DISGUSTED!'
  case 'sadness':
    return 'YOU\'RE SAD :('
  default :
    return 'YOU\'RE LAME!'
  }
}

var binaryBuffer, buf, data, link, index

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
    return highest
  }

router.post('/', (req, res, next) => {
  const imageName = 'test' + index + '.jpg';
  data= req.body.image.replace(/^data:image\/(png|jpeg);base64,/, "");
  buf = new Buffer(data, 'base64');
  binaryBuffer = new Buffer(buf, 'binary');
  // console.log(data)
  imgur.uploadBase64(data)
    .then(function (json) {
        link = json.data.link;
        options.body.url=link
        // console.log(link)
        // console.log(json.data.link)
        return request(options)
    .then((apiResult) => {
      // console.log((apiResult[0]).scores)
      console.log('apiResult', apiResult)
      return(anotherOne(apiResult[0].scores))
    })
    .then((emotion) => {
      console.log(emotion.key + ": " +emotion.value);
      res.send(emotion.key);
    })
    .catch( (err) => {
      console.log("Api fetch failed", err);
    });
    })

    .catch(function (err) {
        console.error(err.message)
    });



  // var binaryBuffer = new Buffer(buf, 'binary')
  // fs.writeFile(path.join(__dirname, `../../public/images/${imageName}`), buf,  (err) => {
  //   if(err){
  //     res.send('Failure');
  //     throw err;
  //   }
  //   res.send('Success');
  // })
  // if (link) {
  //   console.log(link)
  // }
  // var options = {
  //   method: 'POST',
  //   uri:'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  //   body: {'url' : `'${link}'`},
  //   headers: {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': '6f7761f334d64fd6858be9240a806eb9' },
  //   json: true
  // };

  // request(options)
  //   .then((apiResult) => {
  //     console.log(apiResult)
  //   })
  //   .catch( (err) => {
  //     console.log("Api fetch failed", err);
  //   });

  })
// binaryBuffer = fs.readFileSync(path.join(__dirname, '../../public/images/test1.jpg'))
// // binaryBuffer = fs.createReadStream(p)
//   buf = new Buffer(binaryBuffer, 'base64');
// var buffer = new Buffer (binaryBuffer, 'binary')
// console.log('binary buffer here!', buf)
// imgur.uploadBase64(buf)
//     .then(function (json) {
//         console.log(json.data.link)
//     })
//     .catch(function (err) {
//         console.error(err.message)
//     });
// console.log(link)
// var options = {
//   method: 'POST',
//   uri:'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
//   body: {'url' : `'${link}'`},
//   headers: {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': '6f7761f334d64fd6858be9240a806eb9' },
//   json: true
// };

// request(options)
//   .then((apiResult) => {
//     console.log(apiResult)
//   })
//   .catch( (err) => {
//     console.log("Api fetch failed", err);
//   });

module.exports = router;
