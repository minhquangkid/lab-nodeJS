const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

// /add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /add-product => POST
router.post("/add-product", isAuth, adminController.postAddProduct);

router.post("/edit-product", isAuth, adminController.editProduct);

router.delete("/delete-product/:id", isAuth, adminController.deleteProduct);

module.exports = router;
