const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll().then( (data)=>{
    console.log(data);
    res.send({
      prods: data,
      path: "/products",
    });
  });
};

exports.getCarts = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.findAll().then((data) => {
      const cartProducts = [];
      for (product of data) {
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
  Product.findByPk(prodId).then((product) => {
    Cart.deleteProduct(prodId, product.price);
    res.status(200).send(true);
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((data) => {
    // truyền vô fetchAll là callback function có tham số là products
    res.send({
      // res.send sẽ trả về cùng lúc cho cả 2 địa chỉ là http://localhost:3000 và http://localhost:5000 nên khi mở localhost:5000 lên vẫn sẽ thấy JSON này
      prods: data,
      path: "/",
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  // Product.findByPk(prodId).then((product) => {
  //   console.log(product);
  //   res.send({
  //     product: product,
  //     pageTitle: product.title,
  //   });
  // });
  Product.findAll({where : {id : prodId}}).then(product=>{
    console.log(product);
    res.send({
      product: product[0],
      pageTitle: product.title,
    });
  })
};

exports.postCart = (req, res, next) => {
  console.log(req.body);
  const prodId = req.body.id;

  Product.findByPk(prodId).then((product) => {
    console.log(product);
    Cart.addProduct(prodId, product.price);
    res.status(200).send(true);
  });
};
