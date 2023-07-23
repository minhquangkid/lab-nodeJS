import "../CSS/main.css";
// do dùng <a> mà ko dùng <link> nên web sẽ bị load lại mỗi lần chuyển route, vì vậy Navbar sẽ chạy lại mỗi lần trong app.js nên ta ko cần dùng useEffect, còn nếu dùng Link thì phải dùng useState (có thể dùng thêm useEffect) để có thể cập nhật được props.receive

const Navbar = (props) => {
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <a className={props.receive === "/" ? "active" : ""} href="/">
              Shop
            </a>
          </li>
          <li className="main-header__item">
            <a
              className={props.receive === "/add-product" ? "active" : ""}
              href="/add-product"
            >
              Add product
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
