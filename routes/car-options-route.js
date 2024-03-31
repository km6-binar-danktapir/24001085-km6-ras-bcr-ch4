const express = require("express");
const router = express.Router();
const carOptionsController = require("../controllers/car-options-controller.js");

router.route("/:id").get(carOptionsController.findOptionsByCarId);
router.route("/").post(carOptionsController.addOptions);

module.exports = router;
