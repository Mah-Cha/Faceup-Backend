var express = require('express');
var router = express.Router();

const cloudinary = require('cloudinary').v2;
const uniqid = require('uniqid');
const fs = require('fs');

router.post('/upload', async (req, res) => {
 const photoPath = `./tmp/${uniqid()}.jpg`;
 const tempPhoto= req.files.photoFromFront;
 const resultMove = await tempPhoto.mv(photoPath);
//  console.log(req.files.photoFromFront);
 console.log(typeof tempPhoto)
 
 const resultCloudinary = await cloudinary.uploader.upload(photoPath);

 if (!resultMove) {
  
   res.json({ result: true, url: resultCloudinary.secure_url });
 } else {
   res.json({ result: false, error: resultMove });
 }

 fs.unlinkSync(photoPath);
});

module.exports = router;
