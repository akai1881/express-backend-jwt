const sequelize = require('./../database.js');
const { DataTypes } = require('sequelize');

const Student = sequelize.define('student', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
});

const School = sequelize.define('school', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  adress: { type: DataTypes.STRING },
});

School.hasMany(Student, { onDelete: 'cascade' });
Student.belongsTo(School);

module.exports = {
  Student,
  School,
};
