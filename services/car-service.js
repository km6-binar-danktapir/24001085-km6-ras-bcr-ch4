const carRepo = require("../repositories/car-repository.js");
const carOptionsService = require("./car-options-service.js");
const carSpecsService = require("./car-specs-service.js");
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
    await carOptionsService.add({
        carId: carData.id,
        options: cleanedPayload.options,
    });
    await carSpecsService.add({
        carId: carData.id,
        specs: cleanedPayload.specs,
    });
    return findById(carData.id);
}

async function updateById(id, payload) {
    await validateCarExistenceById(id); // pass check untuk mastiin existence car id

    const cleanedPayload = getCleanedPayload(payload);
    const carPayload = await getCarPayload(cleanedPayload);
    const carData = await carRepo.updateById(id, carPayload);

    if (cleanedPayload.options) {
        await carOptionsService.updateById({
            carId: carData.id,
            options: cleanedPayload.options,
        });
    }
    if (cleanedPayload.specs) {
        await carSpecsService.updateById(carData.id, cleanedPayload.specs);
    }
    return findById(id);
}

async function deleteById(id) {
    const deletedCar = await carRepo.deleteById(id);

    if (!deletedCar) {
        throw new HttpError({
            statusCode: 404,
            message: `Car with ID ${id} does not exist!`,
        });
    }
    return deletedCar;
}

async function validateCarExistenceById(id) {
    /**
     * call this method for validation purpose only :D
     *
     * wrapper buat ngecek kalo id car ada di DB dengan manggil
     * method findById, kalo ga ada, bakal throw error dari method itu
     */
    await findById(id);
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

module.exports = {findAll, findById, add, updateById, deleteById};
