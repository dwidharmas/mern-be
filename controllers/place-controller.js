const uuid = require("uuid");
const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const placeData = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!placeData) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }

  res.json({ place: placeData });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const placesData = DUMMY_PLACES.find((place) => place.creator === userId);

  if (!placesData) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }

  res.json({ places: placesData });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid.v4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(200).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};
const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Place is deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;