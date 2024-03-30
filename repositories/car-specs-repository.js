const db = require("../models/index.js");
const {CarSpecs} = db.sequelize.models;

async function add(payload) {
    const {carId, specs} = payload;
    const bulkData = specs.map((spec) => {
        return {carId, spec};
    });
    return CarSpecs.bulkCreate(bulkData);
}

module.exports = {add};
