const carService = require("../services/car-service.js");

async function findAllCars(_, res) {
    const data = await carService.findAll();

    return res.status(200).json({
        data,
        message: null,
    });
}

module.exports = {findAllCars};