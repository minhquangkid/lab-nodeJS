const Product = require("../models/product");
const Cart = require("../models/cart");
const { where } = require("sequelize");

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

  req.user
  .createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result => {
    // console.log(result);
    console.log('Created Product');
    res.redirect('http://localhost:3000');
  })
  .catch(err => {
    console.log(err);
  });
};

exports.editProduct = (req, res, next) => {
  console.log(req.body);
  console.log(req.body.id);
  Product.update(req.body, {where : { id : req.body.id}}).then((data)=>{
    res.redirect("http://localhost:3000");
  }).catch(err=> console.log(err));

};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.id;
  console.log(prodId);
  Product.destroy({ where : { id : prodId}});

  res.status(200).send(true);
};
