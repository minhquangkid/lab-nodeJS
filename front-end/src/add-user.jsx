import { Fragment } from "react";
import { Link } from "react-router-dom";

const AddUser = () => {
  return (
    <Fragment>
      <div style={{ margin: "20px" }}>
        <div>
          <span>
            <Link to="/">Enter User</Link>
          </span>
          <span> | </span>
          <span>
            <Link to="/users">Users</Link>
          </span>
        </div>
        <input type="text" />
        <button>Add user</button>
      </div>
    </Fragment>
  );
};

export default AddUser;
