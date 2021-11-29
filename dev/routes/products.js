const express = require("express");
const router = express.Router();

// Imports
const { getProducts } = require("../db/db");

router.get("/", (req, res) => {
  try {
    const products = getProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    res.send("You're on the user's product page");
  } catch (error) {
    console.error(error);
  }
});

router.post("/", (req, res) => {
  try {
    res.send("POST You're on the user's product page");
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", (req, res) => {
  try {
    res.send("PUT You're on the user's product page");
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    res.send("DELETE You're on the user's product page");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
