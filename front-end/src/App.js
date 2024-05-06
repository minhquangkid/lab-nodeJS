import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Shop from "./components/shop";
import AddProduct from "./components/add-product";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
      </Routes>
    </Fragment>
  );
}

export default App;
