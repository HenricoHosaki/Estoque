const database = require('../database/database');
const User = require('./user');
const Product = require('./product');
const Inventory = require('./inventory');

class InventoryMovement{
    constructor(){
        this.model = database.db.define('inventory_Movements',{
        id:{
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        type:{
                type: database.db.Sequelize.STRING,
                allowNull: false
        },
        amount:{
                type: database.db.Sequelize.INTEGER,
                allowNull: false
        },
        userId:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: User,
                    key: 'id'
                },
                allowNull: false
            },
        productId:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: Product,
                    key: 'id'
                },
                allowNull: false
            },
        inventoryId:{
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: Inventory,
                    key: 'id'
                },
                allowNull: false
            },
        })
        this.model.belongsTo(User, { foreignKey: 'userId'});
        User.hasMany(this.model, { foreignKey: 'userId'});
        this.model.belongsTo(Product, { foreignKey: 'productId'});
        Product.hasMany(this.model, { foreignKey: 'productId'});
        this.model.belongsTo(Inventory, { foreignKey: 'inventoryId'});
        Inventory.hasMany(this.model, { foreignKey: 'inventoryId'});
    }
}

module.exports = new InventoryMovement().model;