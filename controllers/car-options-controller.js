const carOptionsService = require("../services/car-options-service.js");

async function findOptionsByCarId(req, res, next) {
    try {
        const carId = req.params.id;
        const data = await carOptionsService.findByCarId(carId);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

async function addOptions(req, res, next) {
    try {
        const payload = req.body;
        const data = await carOptionsService.add(payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {findOptionsByCarId, addOptions};
