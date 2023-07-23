import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./views/navbar";
import Shop from "./views/shop";
import AddProduct from "./views/addProduct";
import Products from "./views/products";
import ProductDetail from "./views/product-detail";

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
        <Route path="/products" element={<Products url={getUrl} />} />
        <Route path="/products/:id" element={<ProductDetail url={getUrl} />} />
        <Route path="/add-product" element={<AddProduct url={getUrl} />} />
      </Routes>
    </Fragment>
  );
}

export default App;
