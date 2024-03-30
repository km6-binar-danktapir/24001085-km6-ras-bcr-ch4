'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ModelManufacture extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ModelManufacture.hasOne(models.Car,
                {
                    as: {
                        singular: "Car",
                        plural: "Cars",
                    },
                    foreignKey: "carModel",
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
            );
        }
    }

    ModelManufacture.init({
        model: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        manufacture: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ModelManufacture',
        tableName: 'ModelManufacture',
        id: false, // default given id attribute is excluded
    });
    return ModelManufacture;
};