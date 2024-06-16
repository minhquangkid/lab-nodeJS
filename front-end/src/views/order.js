import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderApi from "../api/orderApi";

const Order = (props) => {
  const [list, setlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //   fetch("http://localhost:5000/orders")
    //     .then((res) => res.json())
    OrderApi.getOrder()
      .then((data) => {
        //console.log(data);
        setlist(data);

        props.url("/order");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <ul>
        {list.length > 0 ? (
          list.map((item) => {
            return (
              <li key={item._id}>
                <h1>#{item._id}</h1>
                <ul>
                  {item.products.map((e) => {
                    return (
                      <li key={e.product._id}>
                        {e.product.title} ( {e.quantity}) -
                        <a
                          href={"http://localhost:5000/invoice/" + item._id}
                          target="_blank"
                        >
                          invoice
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })
        ) : (
          <h1>Nothing there!</h1>
        )}
      </ul>
    </Fragment>
  );
};

export default Order;
