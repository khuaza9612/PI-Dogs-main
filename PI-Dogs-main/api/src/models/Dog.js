const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    weight: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: { type: DataTypes.JSONB, 
      allowNull: true,
    },
    created: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    timestamps: false,
  });
};
