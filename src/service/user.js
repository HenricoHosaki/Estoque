require('dotenv').config();
const modelUser = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const roles = ["admin", "employee"];
const salt = 12;
const secretKey = process.env.JWT_SECRET;

const ServiceOrganization = require('./organization');
const database = require('../database/database');

class ServiceUser {

  async findAll(organizationId, transaction) {
    if (!organizationId) throw new Error('OrganizationId is required');
    return modelUser.findAll({ where: { organizationId }, transaction });
  }

  async findById(id, organizationId, transaction) {
    if (!id) throw new Error('Id is required');
    return modelUser.findOne({ where: { id, organizationId }, transaction });
  }

  async create(organizationId, name, email, password, role, transaction) {
    if (!name) throw new Error('Name is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    if (!role) throw new Error('Role is required');
    if (!organizationId) throw new Error('OrganizationId is required');

    if (!roles.includes(role)) throw new Error('Invalid role');

    const existingUser = await modelUser.findOne({ where: { email }, transaction });
    if (existingUser) throw new Error('Email already registered');

    const hashPass = await bcrypt.hash(password, salt);

    return modelUser.create(
      { organizationId, name, email, password: hashPass, role },
      { transaction }
    );
  }

  async update(id, organizationId, name, email, password, role, transaction) {
    const oldUser = await this.findById(id, organizationId, transaction);
    if (!oldUser) throw new Error('User not found');

    if (role && !roles.includes(role)) throw new Error('Invalid role');

    oldUser.name = name || oldUser.name;
    oldUser.email = email || oldUser.email;
    oldUser.password = password ? await bcrypt.hash(password, salt) : oldUser.password;
    oldUser.role = role || oldUser.role;

    await oldUser.save({ transaction });
    return oldUser;
  }

  async delete(id, organizationId, transaction) {
    const user = await this.findById(id, organizationId, transaction);
    if (!user) throw new Error('User not found');

    await user.destroy({ transaction });
    return { message: "User deleted successfully" };
  }

  async login(email, password, transaction) {
    if (!email || !password)
      throw new Error("Email or password missing in the body");

    const user = await modelUser.findOne({ where: { email }, transaction });
    if (!user) throw new Error("Email or password incorrect");

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) throw new Error("Email or password incorrect");

    // Gera token JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        organizationId: user.organizationId,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    return token;
  }

  async register(organizationName, organizationAddress, organizationPhone, organizationEmail, name, email, password) {
    const transaction = await database.db.transaction();
    try {
      // 1. Criar a Organização
      const organization = await ServiceOrganization.create(
        {
          name: organizationName,
          address: organizationAddress,
          phone: organizationPhone,
          email: organizationEmail,
        },
        transaction
      );

      // 2. Criar o Usuário Admin
      const user = await this.create(
        organization.organization.id,
        name,
        email,
        password,
        "admin",
        transaction
      );

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async verify(id, role, transaction) {
    return modelUser.findOne({ where: { id, role }, transaction });
  }
}

module.exports = new ServiceUser();