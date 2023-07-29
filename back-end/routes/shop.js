const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProductDetail);

router.get("/carts", shopController.getCarts);

router.get("/orders", shopController.getOrders);

router.post("/cart", shopController.postCart);

router.get("/delete-cart/:id", shopController.getCartDeleteProduct);

router.post("/create-order", shopController.postOrder);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
