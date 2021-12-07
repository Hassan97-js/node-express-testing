const express = require("express");
const router = express.Router();

// Imports
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require("../db/db");

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
    const productId = req.params.id;
    const newProduct = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price
    };
    const success = updateProduct(productId, newProduct);
    success ? res.status(200).json({ success: true }) : res.status(400).json({ success: false });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const success = deleteProduct(id);
    success ? res.status(202).json({ success: true }) : res.status(400).json({ success: false });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
