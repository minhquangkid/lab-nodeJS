const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

// /add-product => GET
router.get("/add-product", productsController.getAddProduct);

// /add-product => POST
router.post("/add-product", productsController.postAddProduct);

module.exports = router;
