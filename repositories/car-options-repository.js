const db = require("../models/index.js");
const {CarOptions} = db.sequelize.models;

async function findById(id) {
    return CarOptions.findAll({
        where: {
            carId: id,
        },
    });
}

async function addOne(payload) {
    return [await CarOptions.create({
        carId: payload.carId,
        option: payload.options,
    })];
}

async function addMultiple(payload) {
    return CarOptions.bulkCreate(payload);
}

async function deleteById(id) {
    return CarOptions.destroy({
        where: {
            carId: id,
        },
    });
}

module.exports = {deleteById, findById, addOne, addMultiple};
