const db = require("../models/index.js");
const {CarSpecs} = db.sequelize.models;
const carRepo = require("./car-repository.js");
const redis = require("../helpers/redis.js");

async function findByCarId(carId) {
    let data;
    const key = `CarSpecs:${carId}`;
    data = await redis.getData(key);

    if (data) {
        return data;
    }
    data = await CarSpecs.findAll({
        attributes: ["spec"],
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
    const data = await CarSpecs.create({
        carId,
        option: payload.options,
    });
    const key = `CarSpecs:${carId}`;
    await redis.setData(key, data);

    return data;
}

async function addMultiple(payload) {
    const carId = payload[0].carId;
    const data = await CarSpecs.bulkCreate(payload);
    const key = `CarSpecs:${carId}`;
    await redis.setData(key, data);

    return data;
}

async function deleteByCarId(carId) {
    const deletedCount = await CarSpecs.destroy({
        where: {
            carId: carId,
        },
    });
    const key = `CarSpecs:${carId}`;
    await redis.deleteData(key);

    return deletedCount;
}

module.exports = {findByCarId, addOne, addMultiple, deleteByCarId, getBelongingCarById};
