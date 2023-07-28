const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
  res.send({
    path: "/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect("http://localhost:3000");
    })
    .catch(err => {
      console.log(err);
      res.status(400);
    });
};

exports.editProduct = (req, res, next) => {
  console.log(req.body);
  console.log(req.body.id);
  Product.update(req.body);
  res.redirect("http://localhost:3000");
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.id;
  console.log(prodId);
  Product.deleteById(prodId);

  res.status(200).send(true);
};
