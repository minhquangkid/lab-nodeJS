import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const [list, setlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/carts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // data sẽ trả về 1 object với nhiều key, trong đó có key prods chứa array
        setlist(data.products);

        props.url("/cart");
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete-cart/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div>
        {list.length > 0 ? (
          list.map((item) => {
            return (
              <div key={item.productData.price}>
                <ul>
                  <li>
                    <p>
                      {item.productData.title} ({item.qty})
                    </p>
                    <button
                      className="btn"
                      onClick={() => handleDelete(item.productData.id)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <h1>No Products in Cart!</h1>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
