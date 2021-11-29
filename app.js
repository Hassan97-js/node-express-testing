// Application imports
const express = require("express");
const app = express();

require("dotenv").config({ path: "./config/env/.env" });

// Routes imports
const products = require("./dev/routes/products");
const users = require("./dev/routes/users");
const carts = require("./dev/routes/carts");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/carts", carts);

// Default 404 page
app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
