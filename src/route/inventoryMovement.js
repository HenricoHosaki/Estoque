const ApiInventoryMovement = require('../api/inventoryMovement');
const authMiddleware = require('../middleware/auth')

module.exports = (router) =>{
    router.get('/:inventoryId/', authMiddleware(), ApiInventoryMovement.findAll);
    router.get('/:id/:inventoryId/', authMiddleware(), ApiInventoryMovement.findById);
    router.post('/:inventoryId/', authMiddleware(), ApiInventoryMovement.create);
    router.put('/:id/:inventoryId/', authMiddleware(), ApiInventoryMovement.update);
    router.delete('/:id/:inventoryId/', authMiddleware(), ApiInventoryMovement.delete);
}