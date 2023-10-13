const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const express = require("express");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);

const Product = require("./models/product");
const User = require("./models/user");
const Order = require("./models/order");

const cors = require("cors"); // dùng cái này mới có thể liên kết FE ở localhost:3000 và BE ở localhost:5000 được
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// dùng 2 dòng này của express thì mới có thể biên dịch được req.body của app.post bên dưới
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));

///////////////////////////////

const MONGODB_URI =
  "mongodb+srv://minhquang:25031998@cluster0.0tlx60u.mongodb.net/shop2";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    key: "userId",
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000 * 60 * 24, // thời gian hết hạn là 1 ngày
      //maxAge: 10000, // set là 10 giây hết hạn, đây là mili giây, dùng maxAge hoặc expires đều được
    },
    store: store,
  })
);
// app.use(csrfProtection);
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(adminRoutes);
app.use(shopRoutes);

app.use(authRoutes);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  // res.locals.csrfToken = req.csrfToken();
  next();
});

//app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
