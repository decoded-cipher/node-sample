
const express = require('express');
const router = express.Router();
const multer = require('multer');

const verifyToken = require('../../middleware/authentication');
const checkPermission = require('../../middleware/authorization');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '.csv')
    }
});


const multerUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(csv)$/)) {
            return cb(new Error('Only csv files are allowed!'), false);
        }
        cb(null, true);
    }
}).array('file', 10);



router.post('/', verifyToken, checkPermission('admin'), (req, res) => {
    multerUpload(req, res, (err) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
        } else {
            res.status(200).json({
                message: 'Files uploaded successfully',
                data: req.files
            });
        }
    });
});


module.exports = router;
