const http = require("http");
const routes = require("./routes");

// nếu ghi ./http thì nó sẽ tìm kiếm trong thư mục hiện tại có file nào tên http ko ? còn nếu ko có ./ thì nó mặc định tìm trong module nodeJS
const server = http.createServer(routes);

server.listen(3000);
