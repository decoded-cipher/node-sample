
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/uploads')
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
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
}).array('files', 10);


module.exports = multerUpload;
