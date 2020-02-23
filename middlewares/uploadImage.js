const multer = require('multer')
const path = require('path')
const upload = multer({
	storage: multer.memoryStorage({}),
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	}
}).array('productImages', 10)

const checkFileType = (file, cb) => {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
};

module.exports = upload