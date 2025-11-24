const ApiInventory = require('../api/inventory');
const authMiddleware = require ('../middleware/auth')

module.exports = (router) =>{
    router.get('/:id', authMiddleware(), ApiInventory.findById);
    router.get('/', authMiddleware(), ApiInventory.findAll);
    router.post('/', authMiddleware(), ApiInventory.create);
    router.put('/:id', authMiddleware(), ApiInventory.update);
    router.delete('/:id', authMiddleware(), ApiInventory.delete);  
}