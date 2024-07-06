const path = require("path");
const fs = require("fs");

const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const session = require("express-session");

const express = require("express");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

const Product = require("./models/product");
const User = require("./models/user");
const Order = require("./models/order");

const cors = require("cors"); // dùng cái này mới có thể liên kết FE ở localhost:3000 và BE ở localhost:5000 được
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
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
// app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, "images");
    fs.mkdirSync(folderPath, { recursive: true }); // Create folder if not exists
    cb(null, folderPath); // .cd là Hàm callback trong Node.js thường có hai tham số: lỗi (error) và kết quả (result). Khi đặt null, điều này có nghĩa là không có lỗi nào xảy ra. Nếu có lỗi, bạn sẽ truyền đối tượng lỗi vào đây.
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image") //Cấu hình và sử dụng multer để xử lý việc tải lên một tệp tin duy nhất với tên trường (field name) là "image".
);

app.use(
  session({
    key: "userId",
    secret: "123456", // thông thường sẽ dùng kết hợp với JWT
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60, // thời gian hết hạn là 1 tiếng
      //maxAge: 10000, // set là 10 giây hết hạn, đây là mili giây, dùng maxAge hoặc expires đều được
      httpOnly: false, // nếu muốn lấy được value của cookie userId thì phải có cái này, vì ban đầu nó bảo mật httpOnly = true
    },
    store: store,
  })
);

// app.use(csrfProtection);

app.use((req, res, next) => {
  //console.log(req.session);
  // console.log("app.js here : ", req.session.user);
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      // console.log("app.js : " + req.user);
      next();
    })
    .catch((err) => console.log(err));
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(adminRoutes);
app.use(shopRoutes);

app.use(authRoutes);

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   // res.locals.csrfToken = req.csrfToken();
//   next();
// });

//app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

/*
Ngoài các phương thức như GET, POST, PUT, và DELETE trong REST API, còn một số phương thức khác như HEAD, PATCH, CONNECT, OPTIONS, và TRACE1. Tuy nhiên, trong thực tế, phương thức GET và POST thường được sử dụng phổ biến nhất. Dưới đây là mô tả ngắn gọn về mỗi phương thức:

GET: Sử dụng để lấy thông tin từ server theo URI đã cung cấp.
HEAD: Tương tự như GET, nhưng response chỉ trả về header mà không có body.
POST: Gửi thông tin tới server thông qua các tham số HTTP để tạo mới một resource.
PUT: Cập nhật thông tin cho resource (toàn bộ resource).
PATCH: Cập nhật thông tin cho resource (một phần của resource).
DELETE: Xóa một resource trên server.

  */
