const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.post("/edit-product", adminController.editProduct);

router.get("/delete-product/:id", adminController.deleteProduct);

module.exports = router;
