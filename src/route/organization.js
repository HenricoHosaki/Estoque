const apiOrganization = require('../api/organization');
const authMiddleware = require('../middleware/auth')

module.exports = (router) => {
    router.get('/:id', authMiddleware('admin'), apiOrganization.findById);
    router.post('/', authMiddleware('admin'), apiOrganization.create);
    router.put('/:id', authMiddleware('admin'), apiOrganization.update);
    router.delete('/:id', authMiddleware('admin'), apiOrganization.delete);
}
