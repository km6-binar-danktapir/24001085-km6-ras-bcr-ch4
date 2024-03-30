const carRepo = require("../repositories/car-repository.js");
const HttpError = require("../middlewares/http-error.js");

async function findAll() {
    return carRepo.findAll();
}

async function findById(id) {
    const data = await carRepo.findById(id);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `Car with ID ${id} does not exist!`,
        });
    }
    return data;
}

module.exports = {findAll, findById};
