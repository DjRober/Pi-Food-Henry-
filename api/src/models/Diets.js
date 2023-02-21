const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("diets", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};