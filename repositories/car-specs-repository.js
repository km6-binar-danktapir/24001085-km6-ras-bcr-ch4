const db = require("../models/index.js");
const {CarSpecs} = db.sequelize.models;

async function add(payload) {
    const {carId, specs} = payload;

    // kalo cuma ada 1 item, then langsung create aja
    if (!(specs instanceof Array)) {
        return CarSpecs.create({
            carId,
            spec: specs,
        });
    }
    const bulkData = specs.map((spec) => {
        return {carId, spec};
    });
    return CarSpecs.bulkCreate(bulkData);
}

async function updateById(id, payload) {
    await deleteById(id);
    return add({
        carId: id,
        specs: payload,
    });
}

async function deleteById(id) {
    return CarSpecs.destroy({
        where: {
            carId: id,
        },
    });
}

module.exports = {add, updateById, deleteById};
