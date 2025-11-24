const modelOrganization = require('../model/organization');
const serviceUser = require('./user');
const generatePassword = require('../fns/generate-password');

class ServiceOrganization{

    async findById(id, transaction){
        if(!id){
            throw new Error('Id is required');
        }
        return modelOrganization.findByPk(id, { transaction });
    }

    async create({name, address, phone, email}, transaction){
        if(!name){
            throw new Error('Name is required');
        }else if(!address){
            throw new Error('Address is required');
        }else if(!phone){
            throw new Error('Phone is required');
        }else if(!email){
            throw new Error('Email is required');
        }
        const organization = await modelOrganization.create(
        { name, address, phone, email },
        {transaction}
        );
        
        return {organization};
    }

    async update(id, name, address, phone, email, transaction){
        const organization = await this.findById(id, transaction);
        if(!organization){
            throw new Error('Organization not found');
        }
        
        organization.name = name || organization.name;
        organization.address = address || organization.address;
        organization.phone = phone || organization.phone;
        organization.email = email || organization.email;
        
        return organization.save({ transaction });
       
    }

    async delete(id, transaction){
        const organization = await this.findById(id, transaction);
        if(!organization){
            throw new Error('Organization not found');
        }
        const deletedOrganization = await organization.destroy({ transaction });
        
        return deletedOrganization;
    }
}

module.exports = new ServiceOrganization();