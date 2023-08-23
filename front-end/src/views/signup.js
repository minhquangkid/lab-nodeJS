import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/product.css";
import "../CSS/forms.css";
import "../CSS/main.css"
const SignUp = (props) => {
  const [message, setMessage] = useState("");
  const [isInVaild , setIsInVaild] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const pass = useRef(null);
  const confirmPass = useRef(null);

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  useEffect(()=>{
    props.url("/signup");
  },[])

  const submit = (event) => {

    setIsInVaild(false);

    console.log(emailRef.current.value);
    console.log(pass.current.value);
    console.log(confirmPass.current.value);

    if(emailRef.current.value == ""){
      setIsInVaild(true);
      setMessage("Missing email")
      return
    }

    if(pass.current.value == ""){
      setIsInVaild(true);
      setMessage("Missing password")
      return
    }

    if(pass.current.value.length < 8){
      setIsInVaild(true);
      setMessage("Password must be more than 8 character")
      return
    }

    if(pass.current.value !== confirmPass.current.value){
      setIsInVaild(true);
      setMessage("Password doesn't match")
      return
    }

    if(!isValidEmail(emailRef.current.value)){
      setIsInVaild(true);
      setMessage("Invalid Email")
      return
    }

    fetch(`http://localhost:5000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailRef.current.value , password : pass.current.value}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if(data === true){

          navigate("/login");
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

  }

  return (
    <Fragment>

            {
              isInVaild? <div className="user-message user-message--error">{message}</div> : <div></div>
           
            }

        <div className="login-form">
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" name="email" id="email" ref={emailRef}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" ref={pass}/>
            </div>
            <div className="form-control">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" ref={confirmPass}/>
            </div>
            <button className="btn" type="click" onClick={()=> {submit()}}>Signup</button>
        </div>
    </Fragment>
  );
};

export default SignUp;
