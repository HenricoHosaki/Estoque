const ApiProduct = require('../api/product');
const authMiddleware = require('../middleware/auth')

module.exports = (router)=>{
    router.get('/:id', authMiddleware(), ApiProduct.findById);
    router.get('/', authMiddleware(), ApiProduct.findAll);
    router.post('/', authMiddleware(), ApiProduct.create);
    router.put('/:id', authMiddleware(), ApiProduct.update);
    router.delete('/:id', authMiddleware(), ApiProduct.delete);
}