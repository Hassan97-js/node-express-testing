const express = require("express");
const router = express.Router();

// Imports
const { getProducts, getProduct, addProduct, updateProduct } = require("../db/db");
/* const { generateUniqueId } = require("../utilities/generic/generators"); */

router.get("/", (_req, res) => {
  try {
    const products = getProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    const product = getProduct(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
  }
});

router.post("/", (req, res) => {
  try {
    const product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price
    };
    addProduct(product);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", (req, res) => {
  try {
    const newProduct = req.body;
    const productId = req.params.id;
    const productIndex = updateProduct(productId, newProduct);

    res.status(200).json({ success: productIndex !== -1 ? true : false });
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
