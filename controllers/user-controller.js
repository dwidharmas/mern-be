const uuid = require("uuid");
const HttpError = require("../models/http-error");

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

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ users: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "could not identify user, please check your credential",
      401
    );
  }

  res.json({ message: "logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
