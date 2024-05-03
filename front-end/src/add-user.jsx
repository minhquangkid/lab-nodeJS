import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState("");

  const sendData = () => {
    console.log(user);
    fetch("http://localhost:5000/add-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    })
      .then((r) => {
        console.log(r);
        return r.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  const changeHandle = (e) => {
    setUser(e.target.value);
  };

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
        <input type="text" value={user} onChange={changeHandle} />
        <button onClick={sendData}>Add user</button>
      </div>
    </Fragment>
  );
};

export default AddUser;
