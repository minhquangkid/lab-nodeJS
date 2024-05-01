// const http = require("http");
// const routes = require("./routes");

// // nếu ghi ./http thì nó sẽ tìm kiếm trong thư mục hiện tại có file nào tên http ko ? còn nếu ko có ./ thì nó mặc định tìm trong module nodeJS
// const server = http.createServer(routes);

// server.listen(3000);

const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("In another middleware");
  res.send("<p>The Middleware that handles just /users</p>");
});

app.use("/", (req, res, next) => {
  console.log("this always runs!");
  res.send("<p>The Middleware that handles just /</p>");
});

app.listen(3000);
