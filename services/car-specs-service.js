const carSpecsRepo = require("../repositories/car-specs-repository.js");
const HttpError = require("../middlewares/http-error.js");

async function add(payload) {
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

async function updateById(id, payload) {
    // delete dulu trus baru add yg baru
    await deleteById(id);
    return add({
        carId: id,
        specs: payload,
    });
}

async function deleteById(id) {
    const toBeDeletedData = await carSpecsRepo.findById(id);

    if (toBeDeletedData.length < 1) {
        throw new HttpError({
            statusCode: 404,
            message: `Spec(s) with car ID ${id} does not exist!`,
        });
    }
    await carSpecsRepo.deleteById(id);
    return toBeDeletedData;
}

module.exports = {add, updateById, deleteById};
