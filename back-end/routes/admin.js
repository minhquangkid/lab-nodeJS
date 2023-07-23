const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

// /add-product => GET
router.get("/add-product", shopController.getAddProduct);

// /add-product => POST
router.post("/add-product", shopController.postAddProduct);

module.exports = router;
