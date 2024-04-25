const http = require("http");
const fs = require("fs");
// nếu ghi ./http thì nó sẽ tìm kiếm trong thư mục hiện tại có file nào tên http ko ? còn nếu ko có ./ thì nó mặc định tìm trong module nodeJS
const server = http.createServer((req, res) => {
  console.log("server is running");
  // phải hỏi GPT để giải thích rõ
  const currentUrl = req.url;
  const method = req.method;

  if (currentUrl === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<header>Enter your message</header>");
    res.write(
      '<div><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Add user</button></form></div>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (currentUrl === "/users") {
    res.write("<html><body><h1>List User</h1></body></html>");
    res.end();
  }
  if (currentUrl === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("list_user.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

server.listen(3000);
