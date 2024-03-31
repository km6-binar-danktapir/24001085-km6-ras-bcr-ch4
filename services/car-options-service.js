const carOptionsRepo = require("../repositories/car-options-repository.js");
const HttpError = require("../middlewares/http-error.js");

async function add(payload) {
    const {carId, options} = payload;

    if (!(options instanceof Array)) {
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

async function updateById(id, payload) {
    // delete dulu trus baru add yg baru
    await deleteById(id);
    return add({
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

module.exports = {add, updateById, deleteById};
