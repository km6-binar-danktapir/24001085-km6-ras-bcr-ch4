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

async function addCar(req, res, next) {
    try {
        const body = req.body;
        const {image} = req.files;
        const payload = {...body, image};
        const data = await carService.add(payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

async function updateCarById(req, res, next) {
    try {
        const carId = parseInt(req.params.id);
        let payload = req.body;

        if (req.files) {
            const {image} = req.files;
            payload = {...payload, image};
        }
        const data = await carService.updateById(carId, payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

async function deleteCarById(req, res, next) {
    try {
        const carId = req.params.id;
        const data = await carService.deleteById(carId);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {findAllCars, findCarById, addCar, updateCarById, deleteCarById};
