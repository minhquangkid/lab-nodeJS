const express = require("express");

const cors = require("cors"); // dùng cái này mới có thể liên kết FE ở localhost:3000 và BE ở localhost:5000 được
const app = express();
app.use(cors());

// const sequelize = require('./util/database');
// const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require('mongoose');

const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

// dùng 2 dòng này của express thì mới có thể biên dịch được req.body của app.post bên dưới
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));

///////////////////////////////
//const bodyParser = require("body-parser");

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use((req, res, next) => {
  User.findById('64cbb60f5803cce4458b71db')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//     // console.log(result);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "quang", email: "quang@test.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     // console.log(user);
//     return user.createCart();
//   })
//   .then((cart) => {
//     app.listen(5000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

mongoose
  .connect(
    'mongodb+srv://minhquang:25031998@cluster0.0tlx60u.mongodb.net/shop2?retryWrites=true'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'quang',
          email: 'minh@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
