'use strict'
const express = require('express');
const videogameController = require('../controllers/Videogame');

//para crear una ruta con express
var router = express.Router();

//para poder trabajar con la carga de fichero (image for user)
var crypto = require('crypto');
var multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './src/uploads/videogames');
    },
    filename(req, file = {}, cb) {
      const { originalname } = file;
      
      const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
      // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + fileExtension);
      });
    },
  });
var md_upload = multer({dest: './src/uploads/videogames',storage});

router.post('/video-game/create', videogameController.create);
router.get('/video-game/videogames', videogameController.list);

router.delete('/video-game/:id', videogameController.delete);
router.get('/video-game/:id', videogameController.getVideogame);

router.post('/video-game/upload-vgame/:vgameId', md_upload.single('photo'), videogameController.uploadphoto);
router.get('/video-game/get-image-vgame/:imageFile', videogameController.getImageFile);

module.exports = router;