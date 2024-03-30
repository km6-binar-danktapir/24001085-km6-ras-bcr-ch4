const db = require("../models/index.js");
const {CarOptions} = db.sequelize.models;

async function add(payload) {
    const {carId, options} = payload;
    const bulkData = options.map((option) => {
        return {carId, option};
    });
    return CarOptions.bulkCreate(bulkData);
}

module.exports = {add};
