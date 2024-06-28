const express = require("express");
const placeControllers = require("../controllers/place-controller");
const router = express.Router();

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlaceByUserId);

router.post("/", placeControllers.createPlace);

router.patch("/:pid", placeControllers.updatePlaceById);

router.delete("/:pid", placeControllers.deletePlaceById);

module.exports = router;
