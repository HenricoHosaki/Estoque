const { or } = require('sequelize');
const database = require('../database/database');
const organization = require('./organization');

class User{
    constructor(){
        this.model = database.db.define('users',{
        id:{
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        name:{
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
        email:{
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
        password:{
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
        role:{
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
        organizationId:{
                type: database.db.Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'organizations',
                    key: 'id'
                }
            }
        })
        this.model.belongsTo(organization, { foreignKey: 'organizationId'});
        organization.hasMany(this.model, { foreignKey: 'organizationId'});
    }
}

module.exports = new User().model;