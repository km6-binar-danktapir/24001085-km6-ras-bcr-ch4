const carRepo = require("../repositories/car-repository.js");
const carOptionsRepo = require("../repositories/car-options-repository.js");
const carSpecsRepo = require("../repositories/car-specs-repository.js");
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

async function add(payload) {
    /**
     * 1. validasi input fields
     * 2. kalo ga ada error, buat object car
     * 3. buat object option(s) dan spec(s) nya
     */
    await validateInputFields(payload);
    const cleanedPayload = getCleanedPayload(payload);
    const carPayload = await getCarPayload(cleanedPayload);
    const carData = await carRepo.add(carPayload);
    await carOptionsRepo.add({
        carId: carData.id,
        options: payload.options,
    });
    await carSpecsRepo.add({
        carId: carData.id,
        specs: payload.specs,
    });

    return carRepo.findById(carData.id);
}

async function getCarPayload(payload) {
    const carFields = await carRepo.getAllColumnNames();
    const carPayload = {};

    for (let field in payload) {
        if (carFields.includes(field)) {
            carPayload[field] = payload[field];
        }
    }
    return carPayload;
}

async function validateInputFields(payload) {
    const excludedCarFields = ["id", "description", "available", "availableAt", "createdAt", "updatedAt"];
    const carFields = await carRepo.getAllColumnNames();
    const requiredCarFields = carFields.filter((field) => !excludedCarFields.includes(field));

    for (let field of requiredCarFields) {
        if (!payload[field]) {
            throw new HttpError({
                statusCode: 400,
                message: `Field ${field} must be filled!`,
            });
        }
    }
    if (!payload.options || payload.options.length === 0) {
        throw new HttpError({
            statusCode: 400,
            message: "Field options must be filled!",
        });
    }
    if (!payload.specs || payload.specs.length === 0) {
        throw new HttpError({
            statusCode: 400,
            message: "Field specs must be filled!",
        });
    }
}

function getCleanedPayload(payload) {
    /**
     * cek kalo ada value yg convertible ke integer
     * kalo ada, convert ke integer
     */
    for (let attr in payload) {
        const value = payload[attr];
        if (!isNaN(parseInt(value))) {
            payload[attr] = parseInt(value);
        }
    }
    return payload;
}

module.exports = {findAll, findById, add};
