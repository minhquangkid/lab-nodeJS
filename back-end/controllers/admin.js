const mongodb = require("mongodb");
const Product = require("../models/product");
const user = require("../models/user");
const User = require("../models/user");

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.send({
    path: "/add-product",
  });
};

exports.postAddProduct = async (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const user = await User.findOne({ email: req.body.email }).exec();

  if (user) {
    const product = new Product({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: user._id,
    });
    product
      .save()
      .then((result) => {
        // console.log(result);
        console.log("Created Product");
        res.status(200).send(true);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("User not found");
    // Handle the case where the user is not found, e.g., return a not-found response
    res.status(400);
    return;
  }
};

exports.editProduct = (req, res, next) => {
  const prodId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save().then((result) => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => console.log(err));

  // Product.findById(prodId)
  //   .then(((product)) => {
  //     product.title = updatedTitle
  //     product.price = updatedPrice
  //     product.description = updatedDesc
  //     product.imageUrl = updatedImageUrl
  //     return product.save()
  //   })
  //   .then((result) => {
  //     console.log("UPDATED PRODUCT!");
  //     res.redirect("http://localhost:3000");
  //   })
  //   .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.id;

  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.status(200).send(true);
    })
    .catch((err) => console.log(err));
};
