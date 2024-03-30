const db = require("../models/index.js");
const {CarOptions} = db.sequelize.models;

async function add(payload) {
    const {carId, options} = payload;

    // kalo cuma ada 1 item, then langsung create aja
    if (!(options instanceof Array)) {
        return CarOptions.create({
            carId,
            option: options,
        });
    }
    const bulkData = options.map((option) => {
        return {carId, option};
    });
    return CarOptions.bulkCreate(bulkData);
}

async function updateById(id, payload) {
    await deleteById(id);
    return add({
        carId: id,
        payload,
    });
}

async function deleteById(id) {
    return CarOptions.destroy({
        where: {
            id: id,
        },
    });
}

module.exports = {add, updateById, deleteById};
