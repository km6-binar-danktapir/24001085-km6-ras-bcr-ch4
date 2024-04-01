const carSpecsRepo = require("../repositories/car-specs-repository.js");
const HttpError = require("../middlewares/http-error.js");

async function findByCarId(carId) {
    const existingCar = await carSpecsRepo.getBelongingCarById(carId);

    if (!existingCar) {
        throw new HttpError({
            statusCode: 404,
            message: `Car with ID ${carId} does not exist!`,
        });
    }
    return carSpecsRepo.findByCarId(carId);
}

async function add(payload) {
    await validateInputFields(payload);
    return _add(payload);
}

async function _add(payload) {
    const {carId, specs} = payload;

    if (!(specs instanceof Array)) {
        return carSpecsRepo.addOne({
            carId,
            spec: specs,
        });
    }
    const bulkData = specs.map((spec) => {
        return {carId, spec};
    });
    return carSpecsRepo.addMultiple(bulkData);
}

async function validateInputFields(payload) {
    const {carId, specs} = payload;

    if (!carId) {
        throw new HttpError({
            statusCode: 404,
            message: "Car ID field must be filled!",
        });
    }
    // cek kalo object car nya ada atau ga, kalo ga ada bakal throw error
    await findByCarId(carId);

    if (!specs) {
        throw new HttpError({
            statusCode: 404,
            message: "Specs field must be filled!",
        });
    }
}

async function updateByCarId(carId, payload) {
    // delete dulu trus baru add yg baru
    await deleteByCarId(carId);
    return _add({
        carId,
        specs: payload,
    });
}

async function deleteByCarId(carId) {
    const toBeDeletedData = await findByCarId(carId);
    await carSpecsRepo.deleteByCarId(carId);
    return toBeDeletedData;
}

module.exports = {add, updateByCarId, deleteByCarId, findByCarId};
