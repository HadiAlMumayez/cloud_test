const multer = require('multer');
const crypto = require('crypto');
const { resolve } = require('path');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, res) => {
      if (err) cb(err);

      file.key = `${res.toString('hex')}-${file.originalname.split(' ').join('-')}`;

      cb(null, file.key);
    });
  }
});

const storageTypes = { local: diskStorage };

module.exports = {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: 1024 * 1024 * 10
};
