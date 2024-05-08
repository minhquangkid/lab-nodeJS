import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "./navigate";
import "../CSS/product.css";

const Shop = (props) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((e) => {
        console.log(e);
        return e.json();
      })
      .then((result) => {
        console.log(result);
        setProds(result);
      });
  }, []);

  // const prods = [
  //   {
  //     title: "A Book",
  //     imageUrl:
  //       "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
  //     description: "This is an awesome book!",
  //     price: "19",
  //   },
  // ];

  return (
    <Fragment>
      <Navigation></Navigation>
      {prods.length > 0 ? (
        <div className="grid">
          {prods.map((product, index) => {
            return (
              <article className="card product-item" key={index}>
                <header className="card__header">
                  <h1 className="product__title"> {product.title}</h1>
                </header>
                <div className="card__image">
                  <img src={product.imageUrl} alt="A Book" />
                </div>
                <div className="card__content">
                  <h2 className="product__price">${product.price}</h2>
                  <p className="product__description">{product.description}</p>
                </div>
                <div className="card__actions">
                  <button className="btn">Add to Cart</button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h1>No Products Found!</h1>
      )}
    </Fragment>
  );
};

export default Shop;
