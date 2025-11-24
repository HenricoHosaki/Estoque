const ApiUser = require('../api/user');
const authMiddleware = require('../middleware/auth');

module.exports = (router) => {
  router.post('/register', ApiUser.register);
  router.get('/info', authMiddleware(), ApiUser.findAll);
  router.put('/', authMiddleware(), ApiUser.update);
  router.delete('/', authMiddleware(), ApiUser.delete);

  router.post('/', authMiddleware('admin'), ApiUser.create);
  router.get('/:id', authMiddleware('admin'), ApiUser.findById);
  router.get('/', authMiddleware('admin'), ApiUser.findAll);
  router.put('/:id', authMiddleware('admin'), ApiUser.update);
  router.delete('/:id', authMiddleware('admin'), ApiUser.delete);
};