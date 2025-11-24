const ServiceInventoryMovement = require('../service/inventoryMovement');

class ApiInventoryMovement{

    async findById(req, res){
        try{
            const { id, inventoryId } = req.params;
            const inventoryMovement = await ServiceInventoryMovement.findById(id, inventoryId);

            res.status(200).json({
                message: inventoryMovement
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the inventoryMovement',
                error: err.message
            })
        }
    }

    async findAll(req, res){
        try{
            const { inventoryId } = req.params;
            const inventoryMovements = await ServiceInventoryMovement.findAll(inventoryId);

            res.status(200).json({
                message: inventoryMovements
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the inventoryMovement',
                error: err.message
            })
        }
    }
    
    async create(req, res){
        try{
            const userId = req.session.id
            const{ inventoryId } = req.params;
            const {type, amount, productId } = req.body;
            const inventoryMovement = await ServiceInventoryMovement.create(inventoryId, userId, type, amount, productId);

            res.status(201).json({
                message: inventoryMovement
            })
        }catch(err){
            res.status(500).json({
                message: 'Error creating the inventoryMovement',
                error: err.message
            })
        }
    }

    async update(req, res){
        try{
            const { id, inventoryId } = req.params;
            const { type, amount} = req.body;
            const inventoryMovement = await ServiceInventoryMovement.update(id, inventoryId, type, amount);


            res.status(200).json({
                message: inventoryMovement
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the InventoryMovement',
                error: err.message
            })
        }
    }

    async delete(req, res){
        try{
            const { id, inventoryId } = req.params;
            const inventoryMovement = await ServiceInventoryMovement.delete(id, inventoryId);


            res.status(200).json({
                message: inventoryMovement
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the InventoryMovement',
            })
        }
    }
}

module.exports = new ApiInventoryMovement();