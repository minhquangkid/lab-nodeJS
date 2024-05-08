const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((data) => {
    console.log(data);
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  // const product = new Product(req.body.title);
  // product.save();
  // res.redirect('/');
};
