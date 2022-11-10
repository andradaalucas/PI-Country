const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    continents: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    maps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    currencies: {
      type: DataTypes.STRING,
      allowNull:true,
    }
  }, {timestamps: false});
};
