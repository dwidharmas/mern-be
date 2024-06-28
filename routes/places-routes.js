const express = require("express");
const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "EMPIRE STATE BUILDING",
    description: "One of the most famouse sky scrapper in the world",
    address: "Fifth Avenue (351) 34th Street (west, 20)",
    locations: {
      lat: 40.748817,
      lng: -73.985428,
    },
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const placeData = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!placeData) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }

  res.json({ place: placeData });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const placesData = DUMMY_PLACES.find((place) => place.creator === userId);

  if (!placesData) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }

  res.json({ places: placesData });
});

module.exports = router;
