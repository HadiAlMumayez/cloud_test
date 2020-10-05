const { Router } = require('express');
const multer = require('multer');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FileController');
const FolderController = require('./app/controllers/FolderController');

const authMiddleware = require('./app/middlewares/auth');

const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const routes = Router();

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);
routes.delete('/files/:id', FileController.delete);

routes.post('/folders', FolderController.store);
routes.get('folders', FolderController.show);
routes.delete('/folders', FolderController.delete);

module.exports = routes;
