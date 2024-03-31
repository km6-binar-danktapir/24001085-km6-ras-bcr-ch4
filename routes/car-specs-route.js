const express = require("express");
const router = express.Router();
const carSpecsController = require("../controllers/car-specs-controller.js");

router.route("/:id")
    .get(carSpecsController.findSpecsByCarId)
    .patch(carSpecsController.updateSpecsByCarId)
    .delete(carSpecsController.deleteSpecsByCarId);

router.route("/").post(carSpecsController.addSpecs);

module.exports = router;
