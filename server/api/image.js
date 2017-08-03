const router = require('express').Router()
const fs = require('fs');
const path = require('path')


var index = 1;

router.post('/', (req, res, next) => {
  const imageName = 'test' + index + '.png';
  //console.log(req.body);
  var img = JSON.stringify(req.body);
  img = JSON.parse(img).data;
  // var data= img.replace(/^image\/\w+;base64,/, "");
  //console.log(req.body);
  // var buf = new Buffer(img, 'base64');
  fs.writeFile(path.join(__dirname, `../../public/images/${imageName}`), img, 'binary',  (err) => {
    if(err){
      throw err;
    }
    res.send('Success');
  })
  // const imageName = 'test' + index + '.png';
  // let wstream = fs.createWriteStream(path.join(__dirname, `../../public/images/${imageName}`));
  // wstream.write(req.body);
  // index++;
  // if (fs.exists(path.join(__dirname, `../../public/images/${imageName}`), (exists) => {
  //   console.log(exists, "file exist");
  //   (exists) ? res.send('Success') : res.send('Failue');
  // }));
})

module.exports = router;
