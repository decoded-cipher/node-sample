
const express = require('express');
const router = express.Router();

const verifyToken = require('../../middleware/authentication');
const checkPermission = require('../../middleware/authorization');
const multerUpload = require('../../middleware/file_upload');

const { sendToUploadQueue } = require('../../config/queue');



router.post('/', multerUpload, async (req, res) => {
    if (!req.files || req.files.length === 0) {

        return res.status(400).json({
            status: 400,
            message: 'No files uploaded'
        });

    } else {
        
        const fileNames = req.files.map(file => file.filename);
        fileNames.forEach(fileName => {
            sendToUploadQueue(fileName);
        });

        return res.status(200).json({
            status: 200,
            message: 'Files uploaded successfully',
            files: fileNames
        });
        
    }

});





module.exports = router;
