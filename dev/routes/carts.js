const express = require("express");
const router = express.Router();

// Imports
const { getCart, getUser, addOrder, updateOrder, deleteOrder } = require("../db/db");

router.get("/:userLogin", (req, res) => {
  try {
    const cart = getCart();
    const userLogin = req.params.userLogin;
    const user = getUser(userLogin);
    user ? res.status(200).json({ cart }) : res.status(400).json({ success: false });
  } catch (error) {
    console.error(error);
  }
});

router.post("/:userLogin", (req, res) => {
  try {
    const userLogin = req.params.userLogin;
    const user = getUser(userLogin);
    if (user) {
      const order = {
        productId: req.body.productId,
        userLogin: req.body.userLogin,
        amount: req.body.amount
      };
      addOrder(order);
      res.status(201).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/:userLogin/:itemId", (req, res) => {
  try {
    const userLogin = req.params.userLogin;
    const orderId = req.params.itemId;
    const order = {
      productId: req.body.productId,
      userLogin: req.body.userLogin,
      amount: req.body.amount
    };

    const user = getUser(userLogin);
    const success = updateOrder(orderId, userLogin, order);

    user && success ? res.status(200).json({ success: true }) : res.status(400).json({ success: false });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:userLogin/:itemId", (req, res) => {
  try {
    const userLogin = req.params.userLogin;
    const orderId = req.params.itemId;
    const success = deleteOrder(orderId, userLogin);

    success ? res.status(202).json({ success: true }) : res.status(400).json({ success: false });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
