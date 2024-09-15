const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordinates = require("../util/location");
const Place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scraper in the world",
    lacation: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St., New York, NY 10001, Stany Zjednoczone",
    creator: "u1",
  },
  {},
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(err);
  }

  if (!place) {
    const error = new HttpError("Could not find a place for provided id!", 404);
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    const err = new HttpError("Fetching places failed", 500);
    return next(err);
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find places for provided user id!",
      404
    );
    return next(error);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coords;

  try {
    coords = await getCoordinates(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coords,
    image:
      "https://cdn.pixabay.com/photo/2020/03/25/11/24/sports-4966933_1280.jpg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed", 500);
    next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("Something went wrong, could not update", 500);
    return next(err);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    const err = new HttpError("Something went wrong, could not update", 500);
    return next(err);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not delete place before finding it",
      500
    );
    return next(err);
  }

  try {
    console.log("Attempting to remove place:", place);
    await place.deleteOne();
    console.log("Place removed successfully");
  } catch (error) {
    console.error("Error occurred while removing place:", error);
    const err = new HttpError(
      "Something went wrong, could not delete place after finding",
      500
    );
    return next(err);
  }

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
