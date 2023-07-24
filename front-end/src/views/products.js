import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = (props) => {
  const [list, setlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // data sẽ trả về 1 object với nhiều key, trong đó có key prods chứa array
        setlist(data.prods);

        props.url(data.path);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
    // window.location.replace(`http://localhost:3000/products/${id}`);
  };

  const addCart = (id) => {
    fetch(`http://localhost:5000/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // data sẽ trả về 1 object với nhiều key, trong đó có key prods chứa array
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div className="grid">
        {list.map((items) => {
          return (
            <div key={items.price}>
              <article className="card product-item">
                <header className="card__header">
                  <h1 className="product__title">{items.title}</h1>
                </header>
                <div className="card__image">
                  <img src={items.imageUrl} alt="A Book" />
                </div>
                <div className="card__content">
                  <h2 className="product__price">${items.price}</h2>
                  <p className="product__description">{items.description}</p>
                </div>
                <div className="card__actions">
                  <button
                    className="btn"
                    onClick={() => {
                      handleNavigate(items.id);
                    }}
                  >
                    Detail
                  </button>
                </div>
                <div className="card__actions">
                  <button
                    className="btn"
                    onClick={() => {
                      addCart(items.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Products;
