const express = require("express");
const router = express.Router();

const { getUsers, getUser, addUser } = require("../db/db");

router.get("/", (_req, res) => {
  try {
    const users = getUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:login", (req, res) => {
  try {
    const login = req.params.login;
    const user = getUser(login);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
  }
});

router.post("/", (req, res) => {
  const newUser = {
    name: req.body.name,
    login: req.body.login
  };
  addUser(newUser);
  res.status(201).json({ success: true });
});

module.exports = router;
