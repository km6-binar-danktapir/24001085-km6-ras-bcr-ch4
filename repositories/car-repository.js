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

module.exports = {findAll};