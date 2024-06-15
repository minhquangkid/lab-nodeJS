import "../CSS/product.css";
import "../CSS/forms.css";
import { Fragment, useEffect, useRef } from "react";
import AdminApi from "../api/adminApi";
import axios from "axios";

const AddProduct = (props) => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const priceRef = useRef(null);
  const desRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("userInf"));

  useEffect(() => {
    // fetch("http://localhost:5000/add-product")
    //   .then((res) => res.json())
    AdminApi.getAddProduct().then((data) => {
      //console.log(data);

      props.url(data.path);
    });
  }, []);

  async function submitForm(event) {
    event.preventDefault();

    if (!isValidTitle(titleRef.current.value)) {
      alert(
        "Title include only letters and numbers, no special characters and at least 3 characters long"
      );
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

    try {
      const formData = new FormData();
      formData.append("image", imageRef.current.files[0]); // phải ghi đúng key là image vì bên back-end khai báo multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
      formData.append("description", desRef.current.value);
      formData.append("title", titleRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("email", user.email);

      const result = await axios.post(
        "http://localhost:5000/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // truyền form, chứa được cả binary, string
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(result.data);

      // const response = await fetch("http://localhost:5000/add-product", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "multipart/form-data", // đây là 1 form chứa cả binary, text, json,...
      //   },
      //   body: JSON.stringify({
      //     title: titleRef.current.value,
      //     imageUrl: imageRef.current.files[0],
      //     price: priceRef.current.value,
      //     description: desRef.current.value,
      //     email: user.email,
      //   }),
      // });

      // if (response.ok) {
      //   const data = await response.json();
      //   //console.log(data);
      //   window.location.replace("/");
      // } else {
      //   console.error("Failed to add product");
      // }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    ////////////// when using image url , because the header is set "content-type": "application/json"
    // AdminApi.postAddProduct({
    //   title: titleRef.current.value,
    //   // imageUrl: imageRef.current.value,
    //   imageUrl: imageRef.current.files[0],
    //   price: priceRef.current.value,
    //   description: desRef.current.value,
    //   email: user.email,
    // })
    //   .then((result) => {
    //     console.log(result);
    //     window.location.replace("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  function isValidTitle(input) {
    // Regular expression pattern to match letters and numbers
    const pattern = /^[a-zA-Z0-9]+$/;

    // Check if the input string matches the pattern and is at least 3 characters long
    return pattern.test(input) && input.length >= 3;
  }

  function isValidImageUrl(url) {
    // Regular expression pattern to match a valid image URL format
    // const pattern = /\.(jpeg|jpg|gif|png)$/i;

    // // Check if the URL matches the pattern
    // return pattern.test(url);

    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
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
          {/* <input type="text" name="imageUrl" id="imageUrl" ref={imageRef} /> */}
          <input type="file" name="image" id="image" ref={imageRef} />
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
          Add Product
        </button>
      </form>
    </Fragment>
  );
};

export default AddProduct;
