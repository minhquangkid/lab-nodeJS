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
