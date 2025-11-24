const modelProduct = require('../model/product');

class ServiceProduct{
    async findById(id, organizationId, transaction){
        if(!id)throw new Error('Id is required');
        
        return modelProduct.findOne({ where: {id, organizationId }, transaction });
    }

    async findAll(organizationId, transaction){
        if(!organizationId)throw new Error('OrganizationId is required');
        
        return modelProduct.findAll({ where: { organizationId } ,  transaction });
    }

    async create(organizationId, name, description, transaction){
        if(!organizationId)throw new Error('OrganizationId is required');
        else if(!name)throw new Error('Name is required');
        else if(!description)throw new Error('Description is required');
        
        return modelProduct.create({ organizationId, name, description}, {transaction});
    }

    async update(id, organizationId, name, description, transaction){
        const oldProduct = await this.findById(id, organizationId, transaction);
        
        oldProduct.name = name || oldProduct.name;
        oldProduct.description = description || oldProduct.description;

        await oldProduct.save({ transaction });
       
        return oldProduct
    }

    async delete(id, organizationId, transaction){
        const oldProduct = await this.findById(id, organizationId, transaction);
        if(!oldProduct)throw new Error('Product not found');
        
        const deletedProduct = await oldProduct.destroy({ transaction });

        return deletedProduct;
    }
}

module.exports = new ServiceProduct();