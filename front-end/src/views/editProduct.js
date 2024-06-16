import "../CSS/product.css";
import "../CSS/forms.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ShopApi from "../api/shopApi";
import AdminApi from "../api/adminApi";

const EditProduct = (props) => {
  const params = useParams();
  const [item, setItem] = useState();

  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const priceRef = useRef(null);
  const desRef = useRef(null);

  useEffect(() => {
    // fetch(`http://localhost:5000/products/${params.id}`)
    //   .then((res) => res.json())
    ShopApi.getProductDetail(params.id)
      .then((data) => {
        console.log(data); // data sẽ trả về 1 object với nhiều key, trong đó có key prods chứa array
        titleRef.current.value = data.product.title;
        imageRef.current.value = data.product.imageUrl;
        priceRef.current.value = data.product.price;
        desRef.current.value = data.product.description;
        setItem(data);
      })
      .catch((err) => console.log(err));

    /////////////// nếu dùng tag <form></form> để gửi thì thử dùng cách này

    // document
    //   .querySelector(".product-form")
    //   .addEventListener("submit", async function (event) {
    //     event.preventDefault();

    //     const form = event.target;
    //     const formData = new FormData(form);

    //     const response = await fetch(form.action, {
    //       method: form.method,
    //       body: formData,
    //       credentials: "include", // Include cookies with the request
    //     });

    //     const result = await response.json();
    //     console.log(result);

    //     // Handle response data
    //   });
  }, []);

  async function submitForm(event) {
    event.preventDefault();

    if (!isValidTitle(titleRef.current.value)) {
      alert(
        "Title include only letters and numbers, no special characters and at least 3 characters long"
      );
      return;
    }

    if (!isValidImageUrl(imageRef.current.value)) {
      //console.log(isValidImageUrl(imageRef.current.value));
      //console.log(imageRef.current.value);
      alert("Image URL must be valid");
      return;
    }

    if (!isRealNumber(priceRef.current.value)) {
      alert("Price must be a real number");
      return;
    }

    if (!isValidDes(desRef.current.value)) {
      alert(
        "Description has all letters, numbers, and special characters are allowed in this field. Must be at least 5 characters long"
      );
      return;
    }

    AdminApi.editProduct({
      title: titleRef.current.value,
      imageUrl: imageRef.current.value,
      price: priceRef.current.value,
      description: desRef.current.value,
      id: item.product._id,
    })
      .then((result) => {
        console.log(result);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function isValidTitle(input) {
    // Check if the input string matches the pattern and is at least 3 characters long
    return input.length >= 3;
  }

  function isValidImageUrl(url) {
    // Regular expression pattern to match a valid image URL format
    // const pattern = /\.(jpeg|jpg|gif|png)$/i;

    // // Check if the URL matches the pattern
    // return pattern.test(url);

    // return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    return url.length > 0;
  }

  function isRealNumber(input) {
    // Regular expression pattern to match a valid real number format
    const pattern = /^[-+]?\d+(\.\d+)?$/;

    // Check if the input matches the pattern
    return pattern.test(input);
  }

  function isValidDes(input) {
    // Regular expression pattern to match valid input format
    const pattern = /^[\w\W]{5,}$/;

    // Check if the input matches the pattern
    return pattern.test(input);
  }

  return (
    <Fragment>
      <form className="product-form" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" ref={titleRef} />
          <label htmlFor="title">Image URL</label>
          <input type="text" name="imageUrl" id="imageUrl" ref={imageRef} />
          <label htmlFor="title">Price</label>
          <input type="text" name="price" id="price" ref={priceRef} />
          <label htmlFor="title">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            ref={desRef}
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
