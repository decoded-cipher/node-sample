
const express = require('express');
const router = express.Router();

const verifyToken = require('../../middleware/authentication');
const checkPermission = require('../../middleware/authorization');
const multerUpload = require('../../middleware/file_upload');

const Product = require('../../models/Product');

const { processUpload } = require('../../helpers/upload');




router.post('/', verifyToken, checkPermission('admin'), multerUpload, async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            status: 400,
            message: 'No file uploaded'
        });
    } else {

        const fileName = req.file.filename;

        await processUpload(fileName).then(async (products) => {

            await Product.insertMany(products).then(() => {
                res.status(200).json({
                    status: 200,
                    message: [
                        'File uploaded successfully',
                        'Products added successfully'
                    ],
                    data: products
                });
            }).catch((error) => {
                res.status(500).json({
                    status: 500,
                    message: 'Internal server error',
                    error: error.message
                });
            });

        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        });

    }

});


module.exports = router;
