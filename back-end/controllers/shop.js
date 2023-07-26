const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    // hàm query trả về 1 promise và dùng then để lấy data, nhưng data trả về 2 giá trị gộp chung trong 1 mảng là các rows và các cột fieldData, vì vậy ta chỉ cần lấy rows ra để sài
    console.log(rows);

    res.send({
      prods: rows,
      path: "/products",
    });
  });
};

exports.getCarts = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll().then(([rows, fieldData]) => {
      const cartProducts = [];
      for (product of rows) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.status(200).send({
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.getCartDeleteProduct = (req, res, next) => {
  const prodId = req.params.id;
  console.log(prodId);
  Product.findById(prodId).then(([product, field]) => {
    Cart.deleteProduct(prodId, product[0].price);
    res.status(200).send(true);
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    // truyền vô fetchAll là callback function có tham số là products
    res.send({
      // res.send sẽ trả về cùng lúc cho cả 2 địa chỉ là http://localhost:3000 và http://localhost:5000 nên khi mở localhost:5000 lên vẫn sẽ thấy JSON này
      prods: rows,
      path: "/",
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId).then(([product, field]) => {
    console.log(product);
    res.send({
      product: product[0],
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.postCart = (req, res, next) => {
  console.log(req.body);
  const prodId = req.body.id;

  Product.findById(prodId).then(([product, field]) => {
    console.log(product[0]);
    Cart.addProduct(prodId, product[0].price);
    res.status(200).send(true);
  });
};
