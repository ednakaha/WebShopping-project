
//https://www.positronx.io/angular-8-node-express-js-file-upload-tutorial/

const express = require('express'),
    multer = require('multer');

const UploadRouter = express.Router();

// File upload settings  
const PATH = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({
    storage: storage
});


UploadRouter.route('/api').get(function (req, res) {
    res.end('File catcher');
});

// POST File
UploadRouter.route('/api/upload').post(upload.single('image'), function (req, res) {
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
       
        console.log('file name: '+  upload.filename+ ',File is available!');
        return res.send({
            success: true
        })
    }
});
module.exports = UploadRouter;