const Product = require("../models/product");
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  // Product.fetchAll().then((data) => {
  //   console.log(data);
  //   res.send({
  //     prods: data,
  //     path: "/products",
  //   });
  // });
  Product.find()
  .then(products => {
    console.log(products);
        res.status(200).send({
      prods: products,
      path: "/products",
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getCarts = (req, res, next) => {
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart
  //       .getProducts()
  //       .then((products) => {
  //         res.status(200).send({
  //           path: "/cart",
  //           pageTitle: "Your Cart",
  //           products: products,
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   })
  //   .catch((err) => console.log(err));
  req.user
    .getCart()
    .then((products) => {
      res.status(200).send({
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
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
  .then(products => {
    console.log(products);
    res.status(200).send({
      prods: products,
      path: "/",
    });
  })
  .catch(err => {
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
    .then(product => {
       console.log(product);
        res.send({
      product: product,
    });
    })
    .catch(err => console.log(err));
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
