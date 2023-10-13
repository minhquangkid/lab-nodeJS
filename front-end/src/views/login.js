import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/product.css";
import "../CSS/forms.css";
import "../CSS/main.css";
const Login = (props) => {
  const [message, setMessage] = useState("");
  const [isInVaild, setIsInVaild] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const pass = useRef(null);

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    props.url("/login");

    fetch(`http://localhost:5000/login`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.loggedIn) {
          setLoginStatus(data.user);
        } else {
          setLoginStatus(data.loggedIn);
        }
      });
  }, []);

  const submit = (event) => {
    setIsInVaild(false);

    console.log(emailRef.current.value);
    console.log(pass.current.value);

    if (emailRef.current.value == "") {
      setIsInVaild(true);
      setMessage("Missing email");
      return;
    }

    if (pass.current.value == "") {
      setIsInVaild(true);
      setMessage("Missing password");
      return;
    }

    if (!isValidEmail(emailRef.current.value)) {
      setIsInVaild(true);
      setMessage("Invalid Email");
      return;
    }

    fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: pass.current.value,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data === true) {
          localStorage.setItem(
            "userInf",
            JSON.stringify({
              email: emailRef.current.value,
              password: pass.current.value,
            })
          );
          window.location.replace("/");
        } else {
          setIsInVaild(true);
          setMessage(data.message);
        }
      })
      .catch((error) => {
        // Error occurred during the API call, try catch cũng dùng giống vậy
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        return;
      });
  };

  return (
    <Fragment>
      {isInVaild ? (
        <div className="user-message user-message--error">{message}</div>
      ) : (
        <div></div>
      )}

      <div className="login-form">
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" name="email" id="email" ref={emailRef} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={pass} />
        </div>
        <button
          className="btn"
          type="click"
          onClick={() => {
            submit();
          }}
        >
          Login
        </button>
      </div>
    </Fragment>
  );
};

export default Login;
