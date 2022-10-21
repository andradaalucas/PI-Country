const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents: {
      type: DataTypes.STRING,
      allowNull:false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull:false
    },
    flag: {
      type: DataTypes.STRING,
      allowNull:false
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
  });
};
