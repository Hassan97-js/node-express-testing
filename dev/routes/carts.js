const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("You're on the carts page");
  } catch (error) {
    console.error(error);
  }
});

router.get("/id", (req, res) => {
  try {
    res.send("You're on the user's cart page");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
