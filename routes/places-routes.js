const express = require("express");
const { check } = require("express-validator");
const placeControllers = require("../controllers/place-controller");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.updatePlaceById
);

router.delete("/:pid", placeControllers.deletePlaceById);

module.exports = router;
