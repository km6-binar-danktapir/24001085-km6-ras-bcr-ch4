'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Car', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            plate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            rentPerDay: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            capacity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            transmission: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            available: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            availableAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Car');
    }
};