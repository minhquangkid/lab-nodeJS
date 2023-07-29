import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./views/navbar";
import Shop from "./views/shop";
import AddProduct from "./views/addProduct";
import Products from "./views/products";
import ProductDetail from "./views/product-detail";
import Admin from "./views/admin";
import EditProduct from "./views/editProduct";
import Cart from "./views/cart";
import NotFound from "./views/notFound";
import Order from "./views/order";

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
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin" element={<Admin url={getUrl} />} />
        <Route path="/cart" element={<Cart url={getUrl} />} />
        <Route path="/order" element={<Order url={getUrl}/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Fragment>
  );
}

export default App;
