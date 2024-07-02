const uuid = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Dwi Dharma",
    email: "test@test.com",
    password: "tester",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input, please check your data", 422));
  }

  const { name, email, password, places } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Signing up failed", 500);

    return next(err);
  }

  if (existingUser) {
    const err = new HttpError("User already exist", 422);

    return next(err);
  }

  const createdUser = new User({
    name,
    email,
    image: "https://picsum.photos/200",
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (error) {
    const err = new HttpError("Signing up failed", 500);

    return next(err);
  }

  res.status(201).json({ users: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Logging in failed", 500);

    return next(err);
  }

  if (!existingUser || existingUser.password !== password) {
    const err = new HttpError("Invalid credential", 401);

    return next(err);
  }

  res.json({ message: "logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
