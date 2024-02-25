const express = require('express');
const multer  = require('multer');
const path = require('path');
const { verifyLoggedIn, verifyAdmin } = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const fileRouter = express.Router();

fileRouter.post('/upload', [verifyLoggedIn, verifyAdmin], upload.single('file'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    return res.status(200).send({
        url: `http://localhost:5000/${req.file.filename}`
    });
  });

module.exports = fileRouter;