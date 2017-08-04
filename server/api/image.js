const router = require('express').Router()
const fs = require('fs');
const path = require('path')
const request = require('request-promise');


var index = 1;

// router.post('/', (req, res, next) => {
//   const imageName = 'test' + index + '.png';
//   //console.log(req.body);
//   // var img = JSON.stringify(req.body);
//   // img = JSON.parse(img, (key, value) => {
//   //   return value;
//   // });
//   // img = JSON.stringify(img);
//   //var data= img.replace(/^data:image\/(png|jpg);base64,/, "");

//   // console.log(req.body);
//   // var buf = new Buffer(data, 'base64');
//   fs.writeFile(path.join(__dirname, `../../public/images/${imageName}`), req.body ,  (err) => {
//     if(err){
//       throw err;
//     }
//     res.send('Success');
//   })
//   // const imageName = 'test' + index + '.png';
//   // let wstream = fs.createWriteStream(path.join(__dirname, `../../public/images/${imageName}`));
//   // wstream.write(req.body);
//   // index++;
//   // if (fs.exists(path.join(__dirname, `../../public/images/${imageName}`), (exists) => {
//   //   console.log(exists, "file exist");
//   //   (exists) ? res.send('Success') : res.send('Failue');
//   // }));
// })

router.post('/', (req, res, next) => {
  const imageName = 'test' + index + '.png';

  // var img = req.body
  // console.log(Object.keys(req.body));
  // // console.log(img);
  var data= req.body.image.replace(/^data:image\/(png|jpg);base64,/, "");
  var buf = new Buffer(data, 'base64');
  fs.writeFile(path.join(__dirname, `../../public/images/${imageName}`), buf ,  (err) => {
    if(err){
      throw err;
    }
    res.send('Success');
  })
})

// var options = {
//   method: 'POST',
//   uri:'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
//   body: {"url": "http://clipart-library.com/images/dc9rGngoi.jpg"},
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
