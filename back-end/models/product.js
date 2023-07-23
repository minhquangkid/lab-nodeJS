const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  // cd là callback function, nhận tham số là 1 cb
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]); // truyền array rỗng vô cb
    } else {
      cb(JSON.parse(fileContent)); // truyền giá trị vô cb, kết quả là 1 array
    }
  });
};

module.exports = class Product {
  constructor(t, i, p, d, id) {
    // thêm các thuộc tính khác vào chỗ này
    (this.title = t),
      (this.imageUrl = i),
      (this.price = p),
      (this.description = d),
      (this.id = id);
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    }); // nguyên cái arrow function này là hàm cb
  }

  static fetchAll(cb) {
    getProductsFromFile(cb); // cd là callback function
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
