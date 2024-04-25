const http = require("http");
// nếu ghi ./http thì nó sẽ tìm kiếm trong thư mục hiện tại có file nào tên http ko ? còn nếu ko có ./ thì nó mặc định tìm trong module nodeJS
const server = http.createServer((req, res) => {
  console.log("server is running");

  const currentUrl = req.url;

  //   if (currentUrl === "/") {

  //   }
  //   if (currentUrl === "/users") {
  //   }
  //   if (currentUrl === "/create-user") {
  //   }

  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<body>");
  res.write("<h1>hi all</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
