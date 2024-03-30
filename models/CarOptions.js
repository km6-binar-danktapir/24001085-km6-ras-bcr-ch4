'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CarOptions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CarOptions.belongsTo(models.Car, {foreignKey: "carId"});
        }
    }

    CarOptions.init({
        carId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        option: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'CarOptions',
        tableName: 'CarOptions',
        id: false, // exclude the given default id attribute
        createdAt: false,
        updatedAt: false,
    });
    return CarOptions;
};