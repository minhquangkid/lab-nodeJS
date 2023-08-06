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
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.status(200).send(true);
    })
    .catch((err) => console.log(err));
};
