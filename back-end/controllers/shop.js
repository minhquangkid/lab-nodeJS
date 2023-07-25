const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    // truyền vô fetchAll là callback function có tham số là products
    res.send({
      // res.send sẽ trả về cùng lúc cho cả 2 địa chỉ là http://localhost:3000 và http://localhost:5000 nên khi mở localhost:5000 lên vẫn sẽ thấy JSON này
      prods: products,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    // truyền vô fetchAll là callback function có tham số là products
    res.send({
      // res.send sẽ trả về cùng lúc cho cả 2 địa chỉ là http://localhost:3000 và http://localhost:5000 nên khi mở localhost:5000 lên vẫn sẽ thấy JSON này
      prods: products,
      path: "/",
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.send({
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.postCart = (req, res, next) => {
  console.log(req.body);
  const prodId = req.body.id;

  Product.findById(prodId, (product) => {
    console.log(product);
    Cart.addProduct(prodId, product.price);
    res.status(200).send(true);
  });
};
