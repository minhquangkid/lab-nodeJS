const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();
const isAuth = require("../middleware/is-auth");

router.get("/", shopController.getIndex);

router.get("/products", isAuth, shopController.getProducts);

router.get("/products/:productId", isAuth, shopController.getProductDetail);

router.get("/carts", isAuth, shopController.getCarts);

router.get("/orders", isAuth, shopController.getOrders);

router.post("/cart", isAuth, shopController.postCart);

router.delete("/delete-cart/:id", isAuth, shopController.getCartDeleteProduct);

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/invoice", isAuth, shopController.getInvoice);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
