const express = require("express");
const router = express.Router();
const carController = require("../controllers/car-controller.js");

router.route("/").get(carController.findAllCars);

module.exports = router;
