const db = require("../models/index.js");
const {Car, CarOptions, CarSpecs} = db.sequelize.models;
const redis = require("../helpers/redis.js");

async function findAll() {
    return Car.findAll({
        include: [
            {
                model: CarOptions,
                as: "options",
            },
            {
                model: CarSpecs,
                as: "specs",
            },
        ]
    });
}

async function findById(id) {
    let data;
    const key = `Car:${id}`;
    data = await redis.getData(key);

    if (data) {
        return data;
    }

    data = await Car.findByPk(id, {
        include: [
            {
                model: CarOptions,
                as: "options",
            },
            {
                model: CarSpecs,
                as: "specs",
            },
        ]
    });

    if (data) {
        await redis.setData(key, data);
        return data;
    }
    return null;
}

module.exports = {findAll, findById};