import "../CSS/product.css";
import "../CSS/forms.css";
import { Fragment, useEffect } from "react";

const AddProduct = (props) => {
  useEffect(() => {
    fetch("http://localhost:5000/add-product")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        props.url(data.path);
      });
  }, []);

  return (
    <Fragment>
      <form
        className="product-form"
        action="http://localhost:5000/add-product"
        method="POST"
      >
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
          <label htmlFor="title">Image URL</label>
          <input type="text" name="image" id="image" />
          <label htmlFor="title">Price</label>
          <input type="text" name="price" id="price" />
          <label htmlFor="title">Description</label>
          <textarea type="text" name="des" id="des" />
        </div>

        <button className="btn" type="submit">
          Add Product
        </button>
      </form>
    </Fragment>
  );
};

export default AddProduct;
