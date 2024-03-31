const db = require("../models/index.js");
const {CarSpecs} = db.sequelize.models;

async function findById(id) {
    return CarSpecs.findAll({
        attributes: ["spec"],
        where: {
            carId: id,
        },
    });
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
