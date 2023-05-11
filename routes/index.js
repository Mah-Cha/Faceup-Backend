var express = require('express');
var router = express.Router();

const cloudinary = require('cloudinary').v2;
// const uniqid = require('uniqid');
// const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.post('/upload', async (req, res) => {  
  const imageData = [];

  req.on('data', data => {
    imageData.push(data);
  });

  req.on('end', () => {
    const imageBuffer = Buffer.concat(imageData);

    cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        async (error, data) => {
            if (error) {
                //response if false
                res.json({ result: false, error });
            } else {
                //response if true
                res.json({ result: true, url: data.secure_url });
            }
        }
    ).end(imageBuffer);
});
})

// router.post('/upload', async (req, res) => {  
//  const photoPath = `./tmp/${uniqid()}.jpg`;
//  //fichier temp à traiter a convertir en B64, en recupérant le flux depuis req.files.photofromfront, créer un blob qui va être upload vers cloudinary
//  const tempPhoto= req.files.photoFromFront;
//  const resultMove = await tempPhoto.mv(photoPath);
// //  console.log(req.files.photoFromFront);
//  console.log(typeof tempPhoto)
 
//  const resultCloudinary = await cloudinary.uploader.upload(photoPath);

//  if (!resultMove) {
  
//    res.json({ result: true, url: resultCloudinary.secure_url });
//  } else {
//    res.json({ result: false, error: resultMove });
//  }

//  fs.unlinkSync(photoPath);
// });

module.exports = router;
