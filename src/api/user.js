ServiceUser = require('../service/user');

class ApiUser{

    async findById(req, res){
        try{
            const { id } = req.params;
            const organizationId = req.session.organizationId;
            const user = await ServiceUser.findById(id , organizationId);

            res.status(200).json({
                message: user
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the user',
                error: err.message
            })
        }
    }

    async findAll(req, res){
        try{
            const organizationId = req.session.organizationId;
            const users = await ServiceUser.findAll( organizationId);

            res.status(200).json({
                message: users
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the users',
            })
        }
    }
    
    async create(req, res){
        try{
            const organizationId = req.session.organizationId;
            const{name, email, password, role} = req.body;
            const user = await ServiceUser.create(organizationId, name, email, password, role);

            res.status(201).json({
                message: user
            })
        }catch(err){
            res.status(500).json({
                message: 'Error creating the user',
            })
        }
    }

    async update(req, res){
        try{
            const organizationId = req.session.organizationId;
            const { id } = req.params;
            const { name, email, password, role} = req.body;
            const user = await ServiceUser.update(id, organizationId,  name, email, password, role);

            res.status(200).json({
                message: user
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the user',
            })
        }
    }

    async delete(req, res){
        try{
            const organizationId = req.session.organizationId;
            const { id } = req.params;
            const user = await ServiceUser.delete(id, organizationId);

            res.status(200).json({
                message: user
            })
        }catch(err){
            res.status(500).json({
                message: 'Error finding the user',
            })
        }
    }

    async register(req, res){
        try{
            const { organizationName, organizationAddress, organizationPhone, organizationEmail, name, email, password } = req.body;
            const user = await ServiceUser.register(organizationName, organizationAddress, organizationPhone, organizationEmail, name, email, password);

            res.status(201).json({
                message: user
            })
        }catch(err){
            res.status(500).json({
                message: 'Error creating the user and organization',
                error: err.message
            })
        }
    }

    async login(req ,res){
        try{
        const { email, password } = req.body;
        const token = await ServiceUser.login(email, password)

        res.status(200).json({
            message: token
        })}
        catch(err){
            res.status(500).json({
                message: "user not found",
                error: err.message
            })
        }
    }
}

module.exports = new ApiUser();