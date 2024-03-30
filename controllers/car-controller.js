const carService = require("../services/car-service.js");

async function findAllCars(_, res) {
    const data = await carService.findAll();

    return res.status(200).json({
        data,
        message: null,
    });
}

async function findCarById(req, res, next) {
    try {
        const carId = req.params.id;
        const data = await carService.findById(carId);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {findAllCars, findCarById};