import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((e) => {
        console.log(e);
        return e.json();
      })
      .then((result) => {
        console.log(result);
        setList(result);
      });
  }, []);

  const renderList = (
    <ul>
      {list.map((e) => {
        return <li key={e}>{e}</li>;
      })}
    </ul>
  );

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
        {list.length > 0 ? renderList : <h2>No Users Found</h2>}
      </div>
    </Fragment>
  );
};

export default Users;
