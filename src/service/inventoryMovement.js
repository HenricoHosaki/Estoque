const modelInventoryMovement = require('../model/inventoryMovement');
const product = require('../model/product');

const movTypes = ['out', 'in'];

class ServiceInventoryMovement{
    async findById(id, inventoryId, transaction){
        if(!id)throw new Error('Id is required');
        
        return modelInventoryMovement.findOne({ where: {id, inventoryId }, transaction });
    }

    async findAll(inventoryId, transaction){
        
        return modelInventoryMovement.findAll({ where: { inventoryId }, include: {model: product}} ,  {transaction });
    }

    async create(inventoryId, userId, type, amount, productId, transaction){
        if(!inventoryId)throw new Error('InventoryId is required');
        else if(!userId)throw new Error('UserId is required');
        else if(!type || !movTypes.includes(type))throw new Error('Type is required');
        else if(!amount)throw new Error('Amount is required');
        else if(!productId)throw new Error('ProductId is required');
        
        return modelInventoryMovement.create({ inventoryId, userId, type, amount, productId}, {transaction});
    }
    async update(id, inventoryId,  type, amount, transaction){
       const oldInventoryMovement = await this.findById(id, inventoryId, transaction);

        if(!oldInventoryMovement) throw new Error('InventoryMovement not found');
        if(type && !movTypes.includes(type)) throw new Error('Invalid type');

        oldInventoryMovement.type = type || oldInventoryMovement.type;
        oldInventoryMovement.amount = amount || oldInventoryMovement.amount;

        await oldInventoryMovement.save({ transaction });

        return oldInventoryMovement;

    }
    async delete(id, inventoryId, transaction){
        const oldInventoryMovement = await this.findById(id, inventoryId, transaction);
        if(!oldInventoryMovement)throw new Error('Inventory not found');
        
        const deletedInventory = await oldInventoryMovement.destroy({ transaction });

        return deletedInventory;
    }

}

module.exports = new ServiceInventoryMovement();