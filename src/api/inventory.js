ServiceInventory = require('../service/inventory');

class ApiInventory{

    async findById(req, res){
        try{
            const organizationId = req.session.organizationId
            const { id } = req.params;
            const inventory = await ServiceInventory.findById(id, organizationId);

            res.status(200).json({
                message: inventory
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the inventory',
            })
        }
    }

    async findAll(req, res){
        try{
            const organizationId = req.session.organizationId
            const inventories = await ServiceInventory.findAll(organizationId);

            res.status(200).json({
                message: inventories
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the inventories',
            })
        }
    }
    
    async create(req, res){
        try{
            const organizationId = req.session.organizationId
            const{name} = req.body;
            const inventory = await ServiceInventory.create(organizationId, name);

            res.status(201).json({
                message: inventory
            })
        }catch(err){
            res.status(500).json({
                message: 'Error creating the inventory',
                error: err.message
            })
        }
    }

    async update(req, res){
        try{
            const organizationId = req.session.organizationId
            const { id } = req.params;
            const { name } = req.body;
            const inventory = await ServiceInventory.update(id, organizationId, name);

            res.status(200).json({
                message: inventory
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the inventory',
            })
        }
    }

    async delete(req, res){
        try{
            const organizationId = req.session.organizationId
            const { id } = req.params;
            const inventory = await ServiceInventory.delete(id, organizationId);

            res.status(200).json({
                message: inventory
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the inventory',
            })
        }
    }
}

module.exports = new ApiInventory();