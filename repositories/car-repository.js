const db = require("../models/index.js");
const {Car, CarOptions, CarSpecs} = db.sequelize.models;
const redis = require("../helpers/redis.js");
const crypto = require("crypto");
const path = require("path");
const uploader = require("../helpers/cloudinary");

async function findAll() {
    return Car.findAll({
        include: [
            {
                model: CarOptions,
                as: "options",
            },
            {
                model: CarSpecs,
                as: "specs",
            },
        ]
    });
}

async function findById(id) {
    let data;
    const key = `Car:${id}`;
    data = await redis.getData(key);

    if (data) {
        return data;
    }

    data = await Car.findByPk(id, {
        include: [
            {
                model: CarOptions,
                as: "options",
            },
            {
                model: CarSpecs,
                as: "specs",
            },
        ]
    });

    if (data) {
        await redis.setData(key, data);
        return data;
    }
    return null;
}

async function getAllColumnNames() {
    const columns = await Car.describe();
    return Object.keys(columns);
}

async function processImagePhoto(photo) {
    /**
     * process the photo given and upload it to cloudinary
     */
    // make unique file name
    photo.publicId = crypto.randomBytes(16).toString("hex");

    // rename file
    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

    const imageUpload = await uploader(photo);
    return imageUpload.secure_url;
}

async function add(payload) {
    payload.image = await processImagePhoto(payload.image);
    const data = await Car.create(payload);
    const key = `Car:${data.id}`;
    await redis.setData(key, data);
    return data;
}

async function updateById(id, payload) {
    payload.image = await processImagePhoto(payload.image);
    await Car.update(payload, {
        where: {
            id: id,
        },
    });
    const updatedData = await Car.findByPk(id);

    if (updatedData) {
        const key = `Car:${updatedData.id}`;
        await redis.setData(key, updatedData);
        return updatedData;
    }
    return null;
}

async function deleteById(id) {
    const toBeDeleted = await Car.findByPk(id);
    const deletedCount = await Car.destroy({
        where: {
            id: id,
        }
    });

    if (deletedCount > 0) {
        const key = `Car:${id}`;
        await redis.deleteData(key);
        return toBeDeleted;
    }
    return null;
}

module.exports = {findAll, findById, add, getAllColumnNames, updateById, deleteById};
