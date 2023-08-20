import { Fragment, useEffect, useState, useRef } from "react";
import "../CSS/product.css";
import "../CSS/forms.css";
import "../CSS/main.css"
const SignUp = (props) => {
  const [message, setMessage] = useState("");
  const [isInVaild , setIsInVaild] = useState(false);

  const email = useRef(null);
  const pass = useRef(null);
  const confirmPass = useRef(null);

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const submit = (event) => {

    setIsInVaild(false);

    console.log(email.current.value);
    console.log(pass.current.value);
    console.log(confirmPass.current.value);

    if(email.current.value == ""){
      setIsInVaild(true);
      setMessage("Missing email")
    }

    if(pass.current.value == ""){
      setIsInVaild(true);
      setMessage("Missing password")
    }

    if(pass.current.value !== confirmPass.current.value){
      setIsInVaild(true);
      setMessage("Password doesn't match")
    }

    if(!isValidEmail(email.current.value)){
      setIsInVaild(true);
      setMessage("Invalid Email")
    }

  }

  return (
    <Fragment>

            {
              isInVaild? <div className="user-message user-message--error">{message}</div> : <div></div>
           
            }

        <div className="login-form">
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" name="email" id="email" ref={email}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" ref={pass}/>
            </div>
            <div className="form-control">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" ref={confirmPass}/>
            </div>
            <input type="hidden" name="_csrf" value="<%= csrfToken %>"/>
            <button className="btn" type="click" onClick={()=> {submit()}}>Signup</button>
        </div>
    </Fragment>
  );
};

export default SignUp;
