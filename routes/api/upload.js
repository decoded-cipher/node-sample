
const express = require('express');
const router = express.Router();

const verifyToken = require('../../middleware/authentication');
const checkPermission = require('../../middleware/authorization');


router.post('/', verifyToken, checkPermission('admin'), (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'File uploaded successfully',
    });
});


module.exports = router;
