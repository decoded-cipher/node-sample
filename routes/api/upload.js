
const express = require('express');
const router = express.Router();

const verifyToken = require('../../middleware/authentication');
const checkPermission = require('../../middleware/authorization');
const multerUpload = require('../../middleware/file_upload');

const { sendToUploadQueue } = require('../../config/queue');



router.post('/', multerUpload, async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            status: 400,
            message: 'No file uploaded'
        });
    } else {

        const fileName = req.file.filename;
        sendToUploadQueue(fileName);

        return res.status(200).json({
            status: 200,
            message: 'File uploaded successfully',
            file: fileName
        });

    }


});





module.exports = router;
