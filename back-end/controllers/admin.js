const mongodb = require("mongodb");
const Product = require("../models/product");

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.send({
    path: "/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("http://localhost:3000");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editProduct = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.body.id);
  // Product.update(req.body, { where: { id: req.body.id } })
  //   .then((data) => {
  //     res.redirect("http://localhost:3000");
  //   })
  //   .catch((err) => console.log(err));

  const prodId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    new ObjectId(prodId)
  );
  product
    .save()
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("http://localhost:3000");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.id;
  console.log(prodId);
  Product.destroy({ where: { id: prodId } });

  res.status(200).send(true);
};
