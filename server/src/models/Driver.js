const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname:{
       type: DataTypes.STRING,
       allowNull: false,
       },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};

// ID (deben ser distintos a los que vienen de la API). *
// Nombre. *
// Apellido. *
// Descripción. *
// Imagen. *
// Nacionalidad. *
// Fecha de Nacimiento. *