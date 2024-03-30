'use strict';
const {
    Model
} = require('sequelize');
const {now} = require("sequelize/lib/utils");
module.exports = (sequelize, DataTypes) => {
    class Car extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Car.hasMany(models.CarOptions, {
                as: "options",
                foreignKey: "carId",
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
            Car.hasMany(models.CarSpecs, {
                as: "specs",
                foreignKey: "carId",
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
        }
    }

    Car.init({
        plate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rentPerDay: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transmission: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        availableAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Car',
        tableName: 'Car',
    });
    return Car;
};