import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = (props) => {
  const [detail, setDetail] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // data sẽ trả về 1 object với nhiều key, trong đó có key prods chứa array
        setDetail(data.product);

        props.url(data.path);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <div className="grid">
        <div key={detail.price}>
          <article className="card product-item">
            <header className="card__header">
              <h1 className="product__title">{detail.title}</h1>
            </header>
            <div className="card__image">
              <img src={detail.imageUrl} alt="A Book" />
            </div>
            <div className="card__content">
              <h2 className="product__price">${detail.price}</h2>
              <p className="product__description">{detail.description}</p>
            </div>
          </article>
        </div>
        {/* <h1>{params.id}</h1> */}
      </div>
    </Fragment>
  );
};

export default ProductDetail;
