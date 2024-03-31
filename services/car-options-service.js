const carOptionsRepo = require("../repositories/car-options-repository.js");
const HttpError = require("../middlewares/http-error.js");

async function findByCarId(carId) {
    const options = await carOptionsRepo.findById(carId);

    if (options.length < 1) {
        throw new HttpError({
            statusCode: 404,
            message: `Option(s) with car ID ${carId} does not exist!`,
        });
    }
    return options;
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
    /**
     *  cek kalo ada value yg missing
     */
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
    await deleteById(id);
    return _add({
        carId: id,
        options: payload,
    });
}

async function deleteById(id) {
    const toBeDeletedData = await carOptionsRepo.findById(id);

    if (toBeDeletedData.length < 1) {
        throw new HttpError({
            statusCode: 404,
            message: `Option(s) with car ID ${id} does not exist!`,
        });
    }
    await carOptionsRepo.deleteById(id);
    return toBeDeletedData;
}

module.exports = {add, updateById, deleteById, findByCarId};
