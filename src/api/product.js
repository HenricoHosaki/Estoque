ServiceProduct = require('../service/product');

class ApiProduct{

    async findById(req, res){
        try{
            const { id } = req.params;
            const organizationId = req.session.organizationId;
            const product = await ServiceProduct.findById(id, organizationId);

            res.status(200).json({
                message: product
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the product',
            })
        }
    }

    async findAll(req, res){
        try{ 
            const organizationId = req.session.organizationId;
            const products = await ServiceProduct.findAll(organizationId);

            res.status(200).json({
                message: products
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the products',
            })
        }
    }
    
    async create(req, res){
        try{
            const organizationId = req.session.organizationId;
            const{name, description} = req.body;
            const product = await ServiceProduct.create(organizationId, name, description);

            res.status(201).json({
                message: product
            })
        }catch(err){
            res.status(500).json({
                message: 'Error creating the product',
                error: err.message
            })
        }
    }

    async update(req, res){
        try{
            const organizationId = req.session.organizationId;
            const { id } = req.params;
            const { name, description} = req.body;
            const product = await ServiceProduct.update(id, organizationId, name, description);

            res.status(200).json({
                message: product
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the product',
            })
        }
    }

    async delete(req, res){
        try{
            const organizationId = req.session.organizationId;
            const { id } = req.params;
            const product = await ServiceProduct.delete(id, organizationId);

            res.status(200).json({
                message: product
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the product',
            })
        }
    }
}

module.exports = new ApiProduct();