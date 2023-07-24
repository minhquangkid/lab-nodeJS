const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
  res.send({
    path: "/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body); // phải truy cập vô http://localhost:5000/add-product và nhìn vào ô terminal trong backend thì mới thấy được kết quả
  const { title: t, image: i, price: p, des: d } = req.body; // dùng destructuring object (phải lấy đúng tên title, image, price, des rồi sau đó mới đổi nó sang tên khác là t,i,p,d được)
  console.log(t, i, p, d);

  const product = new Product(
    t,
    i,
    p,
    d,
    String(Math.floor(Math.random() * 100))
  ); // sửa lại chỗ này, truyền vào nhiều hơn 1 thuộc tính
  product.save();
  res.redirect("http://localhost:3000");
};

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
