'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CarSpecs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CarSpecs.belongsTo(models.Car, {foreignKey: "carId"});
        }
    }

    CarSpecs.init({
        carId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        spec: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'CarSpecs',
        tableName: 'CarSpecs',
        id: false, // exclude the given id attribute
        createdAt: false, // exclude createdAt
        updatedAt: false, // exclude updatedAt
    });
    return CarSpecs;
};