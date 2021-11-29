const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("You're on the users page");
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    res.send("You're on the user's page");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
