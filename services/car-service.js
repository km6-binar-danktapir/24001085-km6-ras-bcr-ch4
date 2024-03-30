const carRepo = require("../repositories/car-repository.js");

async function findAll() {
    return carRepo.findAll();
}

module.exports = {findAll};