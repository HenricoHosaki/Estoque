const ServiceOrganization = require('../service/organization');

class apiOrganization{

    async findById(req, res){
        try{
            const { id } = req.params;
            const organization = await ServiceOrganization.findById(id);

            res.status(200).json({
                message: organization
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding organization',
            })
        }
    }
    
    async create(req, res){
        try{
            const{name, address, phone, email} = req.body;
            const user = await ServiceOrganization.create({name, address, phone, email});

            res.status(201).json({
                message: user
            })
        }catch(err){
            res.status(500).json({
                message: 'Error creating organization',
                error: err.message
            })
        }
    }

    async update(req, res){
        try{
            const { id } = req.params;
            const {name, address, phone, email} = req.body;
            const organization = await ServiceOrganization.update(id, name, address, phone, email);
            res.status(200).json({
                message: organization
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the organization',
            })
        }
    }

    async delete(req, res){
        try{
            const { id } = req.params;
            const organization = await ServiceOrganization.delete(id);

            res.status(200).json({
                message: organization
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the organization',
                error: err.message
            })
        }
    }
}

module.exports = new apiOrganization();