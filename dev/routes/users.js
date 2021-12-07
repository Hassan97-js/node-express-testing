const express = require("express");
const router = express.Router();

const { getUsers, getUser, addUser, deleteUser } = require("../db/db");

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
    user ? res.status(200).json({ user }) : res.status(400).json({ success: false, message: "Wrong Login!" });
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

router.delete("/:login", (req, res) => {
  const login = req.params.login;
  const success = deleteUser(login);
  success ? res.status(200).json({ success: true }) : res.status(400).json({ success: false });
});

module.exports = router;
