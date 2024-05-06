import { Link, useLocation } from "react-router-dom";
import "../CSS/main.css";

function Navigation() {
  let location = useLocation();

  //   console.log(location);
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <Link className={location.pathname === "/" ? "active" : ""} to="/">
              Shop
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={
                location.pathname === "/admin/add-product" ? "active" : ""
              }
              to="/admin/add-product"
            >
              Add Product
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
