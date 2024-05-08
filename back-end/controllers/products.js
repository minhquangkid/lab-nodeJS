const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((data) => {
    console.log(data);
    res.send(data);
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const product = new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  product.save();
  res.status(200).send(true);
  // const product = new Product(req.body.title);
  // product.save();
  // res.redirect('/');
};
