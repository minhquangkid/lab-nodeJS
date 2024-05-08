import { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "./navigate";
import "../CSS/forms.css";
import { useNavigate } from "react-router-dom";
const AddProduct = (props) => {
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const imageUrlRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Access input values using refs
    const title = titleRef.current.value;
    const imageUrl = imageUrlRef.current.value;
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;

    const formData = {
      title,
      imageUrl,
      price,
      description,
    };

    // Send the form data using fetch
    try {
      const response = await fetch("http://localhost:5000/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Fragment>
      <Navigation></Navigation>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" ref={titleRef} />

          <label htmlFor="imageUrl">Image Url</label>
          <input type="text" name="imageUrl" id="imageUrl" ref={imageUrlRef} />

          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" ref={priceRef} />

          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            cols="10"
            rows="5"
            ref={descriptionRef}
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
