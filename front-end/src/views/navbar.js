import { Fragment } from "react";
import { Link } from "react-router-dom";
import "../CSS/main.css";
// do dùng <a> mà ko dùng <link> nên web sẽ bị load lại mỗi lần chuyển route, vì vậy Navbar sẽ chạy lại mỗi lần trong app.js nên ta ko cần dùng useEffect, còn nếu dùng Link thì phải dùng useState (có thể dùng thêm useEffect) để có thể cập nhật được props.receive

const Navbar = (props) => {
  const logoutHandle = () => {
    localStorage.removeItem("userInf");
    window.location.replace("/");
  };

  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          {!props.isLogin ? (
            <Fragment>
              <li className="main-header__item">
                <Link
                  to="/login"
                  className={props.receive === "/login" ? "active" : ""}
                >
                  Login
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  to="/signup"
                  className={props.receive === "/signup" ? "active" : ""}
                >
                  Signup
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="main-header__item">
                <Link to="/" className={props.receive === "/" ? "active" : ""}>
                  Shop
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  to="/products"
                  className={props.receive === "/products" ? "active" : ""}
                >
                  Products
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  to="/cart"
                  className={props.receive === "/cart" ? "active" : ""}
                >
                  Cart
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  to="/order"
                  className={props.receive === "/order" ? "active" : ""}
                >
                  Order
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  to="/add-product"
                  className={props.receive === "/add-product" ? "active" : ""}
                >
                  Add product
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  to="/admin"
                  className={props.receive === "/admin" ? "active" : ""}
                >
                  Admin
                </Link>
              </li>
              <li className="main-header__item">
                <button
                  type="click"
                  onClick={() => {
                    logoutHandle();
                  }}
                >
                  Logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
