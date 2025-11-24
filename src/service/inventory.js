const modelInventory = require('../model/inventory');
const inventoryMovement = require('./inventoryMovement');
const getProductMovement = require('../fns/get-product-movements')

class ServiceInventory{
    async findById(id, organizationId, transaction){
        if(!id)throw new Error('Id is required');
        
        const inventory = await modelInventory.findOne({ where: {id, organizationId }, transaction });
        inventoryMovement.findByAll(inventory.id)
        if(!inventory){
            throw new Error ("inventory not found");
        }

        const movements = await inventoryMovement.findAll(inventory.id);
        const result = getProductMovement(movements)
        return {...inventory.dataValues, ...result};
    }

    async findAll(organizationId, transaction){
        if(!organizationId)throw new Error('OrganizationId is required');
        
        return modelInventory.findAll({ where: { organizationId } ,  transaction });
    }

    async create(organizationId, name, transaction){
        if(!organizationId)throw new Error('OrganizationId is required');
        else if(!name)throw new Error('Name is required');
        
        return modelInventory.create({ organizationId, name}, {transaction});
    }
    async update(id, organizationId, name, transaction){
        const oldInventory = await this.findById(id, organizationId, transaction);
        
        oldInventory.name = name || oldInventory.name;

        await oldInventory.save({ transaction });
       
        return oldInventory
    }
    async delete(id, organizationId, transaction){
        const oldInventory = await this.findById(id, organizationId, transaction);
        if(!oldInventory)throw new Error('Inventory not found');
        
        const deletedInventory = await oldInventory.destroy({ transaction });

        return deletedInventory;
    }

}

module.exports = new ServiceInventory();