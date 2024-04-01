const carOptionsRepo = require("../repositories/car-options-repository.js");
const HttpError = require("../middlewares/http-error.js");

async function findByCarId(carId) {
    const existingCar = await carOptionsRepo.getBelongingCarById(carId);

    if (!existingCar) {
        throw new HttpError({
            statusCode: 404,
            message: `Car with ID ${carId} does not exist!`,
        });
    }
    return await carOptionsRepo.findByCarId(carId);
}

async function add(payload) {
    await validateInputFields(payload);
    return _add(payload);
}

async function _add(payload) {
    const {carId, options} = payload;

    if (!(options instanceof Array)) {
        // kalo cuma ada 1 item aja, langsung create
        return carOptionsRepo.addOne({
            carId,
            option: options,
        });
    }
    const bulkData = options.map((option) => {
        return {carId, option};
    });
    return carOptionsRepo.addMultiple(bulkData);
}

async function validateInputFields(payload) {
    const {carId, options} = payload;

    if (!carId) {
        throw new HttpError({
            statusCode: 404,
            message: "Car ID field must be filled!",
        });
    }
    // cek kalo object car nya ada atau ga, kalo ga ada bakal throw error
    await findByCarId(carId);

    if (!options) {
        throw new HttpError({
            statusCode: 404,
            message: "Options field must be filled!",
        });
    }
}

async function updateById(id, payload) {
    // delete dulu trus baru add yg baru
    await deleteByCarId(id);
    return _add({
        carId: id,
        options: payload,
    });
}

async function deleteByCarId(id) {
    const toBeDeletedData = await findByCarId(id);
    await carOptionsRepo.deleteByCarId(id);
    return toBeDeletedData;
}

module.exports = {add, updateById, deleteByCarId, findByCarId};
