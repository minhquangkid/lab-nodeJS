const fs = require("fs");

const requestHandle = (req, res) => {
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
    res.write(`<html><body><h1>List User</h1>`);
    res.write(`<ul>`);

    try {
      const data = fs.readFileSync("./list_user.txt");
      var result = data.toString().split("\n");
      console.log(result);

      result.forEach((item) => {
        res.write(`<li>${item}</li>`);
      });
    } catch (e) {
      console.log(e);
    }

    console.log("run first");
    res.write("</ul></body></html>");
    return res.end();
  }
  if (currentUrl === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      // dữ liệu được gửi từng đợt từng đợt như chiếc xa buýt đến trạm đón khách vậy
      console.log("chunk : " + chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      // khi req đã kết thúc thì chuyển từ Buffer sang string
      const parsedBody = Buffer.concat(body).toString();
      console.log("parsedBody: " + parsedBody);
      const message = parsedBody.split("=")[1];

      if (fs.existsSync("./list_user.txt")) {
        fs.readFile("./list_user.txt", (err, currentData) => {
          newData = currentData + "\n" + message;

          fs.writeFile("list_user.txt", newData, (err) => {
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();

            // Trong đoạn mã của bạn, res.setHeader("Location", "/") được sử dụng sau khi xử lý dữ liệu từ một yêu cầu POST thành công. Điều này có nghĩa là sau khi dữ liệu đã được gửi và xử lý thành công, máy chủ sẽ gửi một phản hồi có mã trạng thái 302 (Found) và header "Location" được thiết lập là "/" để chỉ định trình duyệt chuyển hướng đến trang chủ.

            // Khi trình duyệt nhận được phản hồi này từ máy chủ với header "Location", nó sẽ tự động thực hiện chuyển hướng đến URL được chỉ định, tức là trang chủ của ứng dụng web.
          });
        });
      } else {
        fs.writeFile("list_user.txt", message, (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        });
      }
    });
  }
};

module.exports = requestHandle;
