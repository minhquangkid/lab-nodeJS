const express = require("express");

const cors = require("cors"); // dùng cái này mới có thể liên kết FE ở localhost:3000 và BE ở localhost:5000 được
const app = express();
app.use(cors());

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

//app.use(errorController.get404);

app.listen(5000);
