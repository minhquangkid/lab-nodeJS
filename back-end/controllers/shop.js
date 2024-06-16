const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      //console.log(products);
      res.status(200).send({
        prods: products,
        path: "/products",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getCarts = (req, res, next) => {
  // console.log(req.user);
  // res.status(200).send(req.user);
  if (req.user.cart.items.length == 0) {
    console.log("User doesn't have cart");
    return res.status(200).send({
      path: "/cart",
      pageTitle: "Your Cart",
      products: [],
    });
  }

  // Create a new query object using User.findById()
  User.findById(req.user._id)
    .populate("cart.items.productId") // Chain the populate method
    .exec() // Execute the query
    .then((user) => {
      //console.log(user);
      const products = user.cart.items;
      res.status(200).send({
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => res.status(500).send(err));
};
exports.getCartDeleteProduct = (req, res, next) => {
  const prodId = req.params.id;
  //console.log(prodId);
  Product.findById(prodId)
    .then((product) => {
      return req.user.removeFromCart(prodId);
    })
    .then((result) => {
      //console.log(result);
      res.status(200).send(true);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      //console.log(products);
      res.status(200).send({
        prods: products,
        path: "/",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getProductDetail = (req, res, next) => {
  // const prodId = req.params.productId;
  // //console.log(prodId);

  // Product.findById(prodId).then((product) => {
  //   //console.log(product);
  //   res.send({
  //     product: product,
  //   });
  // });

  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      //console.log(product);
      res.send({
        product: product,
      });
    })
    .catch((err) => res.status(500).send(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      //console.log(result);
      res.status(200).send(true);
    });
};

exports.getInvoice = (req, res, next) => {
  ///////////////////// lấy ra file pdf đã có sẵn
  //const invoicePath = path.join("data", "invoices", "test-pdf.pdf");

  // cách này là nó phải đọc toàn bộ file xong hết rồi lưu vô ram, xong mới trả về FE thì nó lâu với dùng dc với file nhỏ, truy cập ít
  // fs.readFile(invoicePath, (err, data) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.setHeader("Content-Type", "application/pdf");
  //   res.setHeader("Content-Disposition", "inline; fileName=quang123.pdf"); // dùng cái này để trình duyệt mở xem trước
  //   // res.setHeader("Content-Disposition", "attachment; fileName=quang123.pdf"); // cái này để tải về mà ko xem
  //   return res.status(200).send(data);
  // });

  // cách này là nhỏ ko đọc hết mà chuyển thành luồng stream rồi gửi luồng stream xuống FE nên sẽ xử lý dc file lớn và lượng truy cập cao
  // const file = fs.createReadStream(invoicePath);
  // res.setHeader("Content-Type", "application/pdf");
  // res.setHeader("Content-Disposition", "inline; fileName=quang123.pdf");

  // file.pipe(res);

  ///////////// tạo ra pdf rồi gửi lại FE
  const orderId = req.params.orderId;
  Order.findById(orderId).then((order) => {
    if (!order) {
      return next(new Error("No order found."));
    }
    if (order.user.userId.toString() !== req.user._id.toString()) {
      return next(new Error("Unauthorized"));
    }
    const invoiceName = "invoice-" + orderId + ".pdf";
    const invoicePath = path.join("data", "invoices", invoiceName);

    const pdfDoc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="' + invoiceName + '"'
    );
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);

    pdfDoc.fontSize(26).text("Invoice", {
      underline: true,
    });
    pdfDoc.text("-----------------------");
    let totalPrice = 0;
    order.products.forEach((prod) => {
      totalPrice += prod.quantity * prod.product.price;
      pdfDoc
        .fontSize(14)
        .text(
          prod.product.title +
            " - " +
            prod.quantity +
            " x " +
            "$" +
            prod.product.price
        );
    });
    pdfDoc.text("---");
    pdfDoc.fontSize(20).text("Total Price: $" + totalPrice);

    pdfDoc.end();
  });
};

exports.getOrders = (req, res, next) => {
  // req.user
  //   .getOrders({ include: ["products"] })
  //   .then((orders) => {
  //     res.status(200).send(orders);
  //   })
  //   .catch((err) => res.status(500).send(err));

  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((err) => res.status(500).send(err));
};

exports.postOrder = (req, res, next) => {
  //console.log(req.user);

  User.findById(req.user._id)
    .populate("cart.items.productId")
    .exec()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.status(200).send(true);
    })
    .catch((err) => res.status(500).send(err));

  /*
  The spread operator (...) is used to create a new object that includes all the properties from i.productId._doc.

  In Mongoose (the MongoDB object modeling library for Node.js), when you use .populate(), the populated document is stored in the _doc property of the Mongoose document.

  So, i.productId._doc represents the populated product document for the current cart item. The spread operator here is used to create a new object with all the properties of the populated product document.
      */
};
