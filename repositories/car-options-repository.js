const db = require("../models/index.js");
const {CarOptions} = db.sequelize.models;
const carRepo = require("./car-repository.js");
const redis = require("../helpers/redis.js");

async function findByCarId(carId) {
    let data;
    const key = `CarOptions:${carId}`;
    data = await redis.getData(key);

    if (data) {
        return data;
    }
    data = await CarOptions.findAll({
        attributes: ["option"],
        where: {
            carId: carId,
        },
    });
    await redis.setData(key, data);

    return data;
}

async function getBelongingCarById(carId) {
    return carRepo.findById(carId);
}

async function addOne(payload) {
    const carId = payload.carId;
    const data = await CarOptions.create({
        carId,
        option: payload.options,
    });
    const key = `CarOptions:${carId}`;
    await redis.setData(key, data);

    return data;
}

async function addMultiple(payload) {
    const carId = payload[0].carId;
    const data = await CarOptions.bulkCreate(payload);
    const key = `CarOptions:${carId}`;
    await redis.setData(key, data);

    return data;
}

async function deleteByCarId(carId) {
    const deletedCount = await CarOptions.destroy({
        where: {
            carId: carId,
        },
    });
    const key = `CarOptions:${carId}`;
    await redis.deleteData(key);

    return deletedCount;
}

module.exports = {deleteByCarId, findByCarId, addOne, addMultiple, getBelongingCarById};
