import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./navigate";
import "../CSS/forms.css";
const AddProduct = (props) => {
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000")
  //     .then((e) => {
  //       console.log(e);
  //       return e.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setList(result);
  //     });
  // }, []);

  // const renderList = (
  //   <ul>
  //     {list.map((e) => {
  //       return <li key={e}>{e}</li>;
  //     })}
  //   </ul>
  // );

  return (
    <Fragment>
      <Navigation></Navigation>
      <form className="product-form" action="/admin/add-product" method="POST">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />

          <label htmlFor="imageUrl">Image Url</label>
          <input type="text" name="imageUrl" id="imageUrl" />

          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" />

          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            cols="10"
            rows="5"
          />
        </div>

        <button className="btn" type="submit">
          Add Product
        </button>
      </form>
    </Fragment>
  );
};

export default AddProduct;
