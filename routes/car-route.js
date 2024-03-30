const express = require("express");
const router = express.Router();
const carController = require("../controllers/car-controller.js");

router.route("/").get(carController.findAllCars).post(carController.addCar);
router.route("/:id")
    .get(carController.findCarById)
    .patch(carController.updateCarById)
    .delete(carController.deleteCarById);

module.exports = router;
