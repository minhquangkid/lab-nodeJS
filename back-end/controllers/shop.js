const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.status(200).send({
        prods: products,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCarts = (req, res, next) => {
  console.log(req.user);

  if (req.user.cart.items[0].productId) {
    // Create a new query object using User.findById()
    User.findById(req.user._id)
      .populate("cart.items.productId") // Chain the populate method
      .exec() // Execute the query
      .then((user) => {
        console.log(user);
        const products = user.cart.items;
        res.status(200).send({
          path: "/cart",
          pageTitle: "Your Cart",
          products: products,
        });
      })
      .catch((err) => console.log(err));
  } else {
    // Handle the case when req.user is not available or does not have the populate method
    console.log(
      "req.user does not exist or does not have the populate method."
    );
    res.status(404);
  }
};
exports.getCartDeleteProduct = (req, res, next) => {
  const prodId = req.params.id;
  console.log(prodId);

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.status(200).send(true);
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.status(200).send({
        prods: products,
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductDetail = (req, res, next) => {
  // const prodId = req.params.productId;
  // console.log(prodId);

  // Product.findById(prodId).then((product) => {
  //   console.log(product);
  //   res.send({
  //     product: product,
  //   });
  // });

  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      res.send({
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.status(200).send(true);
    });
};

exports.getOrders = (req, res, next) => {
  // req.user
  //   .getOrders({ include: ["products"] })
  //   .then((orders) => {
  //     res.status(200).send(orders);
  //   })
  //   .catch((err) => console.log(err));

  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  console.log(req.user);

  User.findById(req.user._id)
    .populate("cart.items.productId")
    .exec()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
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
    .catch((err) => console.log(err));

  /*
  The spread operator (...) is used to create a new object that includes all the properties from i.productId._doc.

  In Mongoose (the MongoDB object modeling library for Node.js), when you use .populate(), the populated document is stored in the _doc property of the Mongoose document.

  So, i.productId._doc represents the populated product document for the current cart item. The spread operator here is used to create a new object with all the properties of the populated product document.
      */
};
