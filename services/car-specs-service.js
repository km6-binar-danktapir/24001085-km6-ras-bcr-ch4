const carSpecsRepo = require("../repositories/car-specs-repository.js");
const HttpError = require("../middlewares/http-error.js");

async function findByCarId(carId) {
    const specs = await carSpecsRepo.findById(carId);

    if (specs.length < 1) {
        throw new HttpError({
            statusCode: 404,
            message: `Spec(s) with car ID ${carId} does not exist!`,
        });
    }
    return specs;
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

async function updateById(id, payload) {
    // delete dulu trus baru add yg baru
    await deleteById(id);
    return _add({
        carId: id,
        specs: payload,
    });
}

async function deleteById(id) {
    const toBeDeletedData = await findByCarId(id);
    await carSpecsRepo.deleteById(id);
    return toBeDeletedData;
}

module.exports = {add, updateById, deleteById, findByCarId};
