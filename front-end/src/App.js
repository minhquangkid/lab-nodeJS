import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./views/navbar";
import Shop from "./views/shop";
import AddProduct from "./views/addProduct";

function App() {
  const [link, setLink] = useState(""); // dùng để kích hoạt thuộc tính active trong thanh navbar

  const getUrl = (e) => {
    setLink(e);
  };

  return (
    <Fragment>
      <Navbar receive={link} />
      <Routes>
        <Route path="/" element={<Shop url={getUrl} />} />
        <Route path="/add-product" element={<AddProduct url={getUrl} />} />
      </Routes>
    </Fragment>
  );
}

export default App;
