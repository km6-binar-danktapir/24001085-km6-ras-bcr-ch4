const db = require("../models/index.js");
const {CarOptions, Car} = db.sequelize.models;

async function findById(id) {
    const car = await Car.findByPk(id);

    if (car) {
        return CarOptions.findAll({
            attributes: ["option"],
            where: {
                carId: id
            }
        });
    }
    return [];
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
