const carSpecsService = require("../services/car-specs-service.js");

async function findSpecsByCarId(req, res, next) {
    try {
        const carId = req.params.id;
        const data = await carSpecsService.findByCarId(carId);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

async function addSpecs(req, res, next) {
    try {
        const payload = req.body;
        const data = await carSpecsService.add(payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

async function updateSpecsByCarId(req, res, next) {
    try {
        const carId = req.params.id;
        const payload = req.body.specs;
        const data = await carSpecsService.updateByCarId(carId, payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

async function deleteSpecsByCarId(req, res, next) {
    try {
        const carId = req.params.id;
        const payload = req.body.options;
        const data = await carSpecsService.deleteByCarId(carId, payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {findSpecsByCarId, addSpecs, updateSpecsByCarId, deleteSpecsByCarId};
