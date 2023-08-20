import "../CSS/product.css";
import "../CSS/forms.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const EditProduct = (props) => {
  const [detail, setDetail] = useState([]);
  const params = useParams();


  useEffect(() => {
    fetch(`http://localhost:5000/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // data sẽ trả về 1 object với nhiều key, trong đó có key prods chứa array
        setDetail(data.product);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <form
        className="product-form"
        action="http://localhost:5000/edit-product"
        method="POST"
      >
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={detail.title}
          />
          <label htmlFor="title">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            defaultValue={detail.imageUrl}
          />
          <label htmlFor="title">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            defaultValue={detail.price}
          />
          <label htmlFor="title">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            defaultValue={detail.description}
          />
          <input
            type="text"
            name="id"
            id="id"
            value={detail._id}
            style={{ display: "none" }}
          />
        </div>

        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </Fragment>
  );
};

export default EditProduct;
