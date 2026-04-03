const sequelize = require('../config/db');
const User = require('./users');
const Role = require('./roles');
const Apprentice = require('./apprentices');

User.belongsTo(Role, {
  foreignKey: 'id_rol',
  as: 'rol',
});

Role.hasMany(User, {
  foreignKey: 'id_rol',
  as: 'usuarios',
});

Apprentice.belongsTo(User, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

User.hasOne(Apprentice, {
  foreignKey: 'id_usuario',
  as: 'aprendiz',
});

module.exports = {
  sequelize,
  User,
  Role,
  Apprentice,
};