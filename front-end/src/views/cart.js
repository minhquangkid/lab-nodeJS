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

  const orderHandle = () => {
    fetch(`http://localhost:5000/create-order`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/order");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div>
        {list.length > 0 ? (
          list.map((item) => {
            return (
              <div key={item.price}>
                <ul>
                  <li>
                    <p>
                      {item.title} ({item.quantity})
                    </p>
                    <button
                      className="btn"
                      onClick={() => handleDelete(item._id)}
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
        {list.length > 0 && (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                orderHandle();
              }}
            >
              Order now !
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
