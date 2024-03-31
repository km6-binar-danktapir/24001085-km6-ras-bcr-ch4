const db = require("../models/index.js");
const {CarSpecs, Car} = db.sequelize.models;

async function findById(id) {
    const car = await Car.findByPk(id);

    if (car) {
        return CarSpecs.findAll({
            attributes: ["spec"],
            where: {
                carId: id,
            },
        });
    }
    return [];
}

async function addOne(payload) {
    return [await CarSpecs.create({
        carId: payload.carId,
        spec: payload.specs,
    })];
}

async function addMultiple(payload) {
    return CarSpecs.bulkCreate(payload);
}

async function deleteById(id) {
    return CarSpecs.destroy({
        where: {
            carId: id,
        },
    });
}

module.exports = {findById, addOne, addMultiple, deleteById};
