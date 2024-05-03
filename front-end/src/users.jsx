import { Fragment } from "react";
import { Link } from "react-router-dom";

const Users = () => {
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
        <h1>Users</h1>
        <h2>No Users Found</h2>
        {/* <ul>
        
       </ul> */}
      </div>
    </Fragment>
  );
};

export default Users;
