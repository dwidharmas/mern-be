const express = require("express");
const placeControllers = require("../controllers/place-controller");
const router = express.Router();

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlaceByUserId);

module.exports = router;
