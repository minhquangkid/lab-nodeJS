const express = require("express");

const cors = require("cors"); // dùng cái này mới có thể liên kết FE ở localhost:3000 và BE ở localhost:5000 được
const app = express();
app.use(cors());

const sequelize = require('./util/database');

// dùng 2 dòng này của express thì mới có thể biên dịch được req.body của app.post bên dưới
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));

///////////////////////////////
//const bodyParser = require("body-parser");
//const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

// test MySQL
// db.execute("SELECT * FROM products_2").then((data) => console.log(data));

//app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    console.log(result);
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
