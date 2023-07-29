const express = require("express");

const cors = require("cors"); // dùng cái này mới có thể liên kết FE ở localhost:3000 và BE ở localhost:5000 được
const app = express();
app.use(cors());

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// dùng 2 dòng này của express thì mới có thể biên dịch được req.body của app.post bên dưới
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));

///////////////////////////////
//const bodyParser = require("body-parser");


app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

/*
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

Dòng này định nghĩa mối quan hệ giữa hai mô hình là Product và User.
Product thuộc về (belongsTo) User. Điều này có nghĩa là mỗi bản ghi trong bảng Product sẽ có một khóa ngoại (foreign key) trỏ tới bản ghi tương ứng trong bảng User.
{ constraints: true, onDelete: 'CASCADE' } là một tùy chọn để đảm bảo ràng buộc và xử lý khi một bản ghi trong bảng User bị xóa (onDelete). Trong trường hợp này, nếu một User bị xóa, tất cả các Product thuộc về User đó sẽ bị xóa (CASCADE).
User.hasMany(Product);

Dòng này định nghĩa mối quan hệ giữa User và Product.
User có nhiều (hasMany) Product. Điều này có nghĩa là mỗi bản ghi trong bảng User có thể liên kết với nhiều bản ghi trong bảng Product thông qua khóa ngoại.
User.hasOne(Cart);

Dòng này định nghĩa mối quan hệ giữa User và Cart.
User có một (hasOne) Cart. Điều này có nghĩa là mỗi bản ghi trong bảng User có thể liên kết với một bản ghi trong bảng Cart thông qua khóa ngoại.
Cart.belongsTo(User);

Dòng này định nghĩa mối quan hệ giữa Cart và User.
Cart thuộc về (belongsTo) User. Điều này có nghĩa là mỗi bản ghi trong bảng Cart sẽ có một khóa ngoại trỏ tới bản ghi tương ứng trong bảng User.
Cart.belongsToMany(Product, { through: CartItem });

Dòng này định nghĩa mối quan hệ nhiều-nhiều (many-to-many) giữa Cart và Product.
Cart thuộc nhiều (belongsToMany) Product. Điều này có nghĩa là mỗi bản ghi trong bảng Cart có thể liên kết với nhiều bản ghi trong bảng Product thông qua bảng trung gian (CartItem).
{ through: CartItem } xác định tên của bảng trung gian là CartItem.
Product.belongsToMany(Cart, { through: CartItem });

Dòng này định nghĩa mối quan hệ nhiều-nhiều (many-to-many) giữa Product và Cart.
Product thuộc nhiều (belongsToMany) Cart. Điều này có nghĩa là mỗi bản ghi trong bảng Product có thể liên kết với nhiều bản ghi trong bảng Cart thông qua bảng trung gian (CartItem).
{ through: CartItem } xác định tên của bảng trung gian là CartItem.
*/


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);



sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'quang', email: 'quang@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });