import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import TodoContext from "../context/TodoContext";
// import { useNavigate } from "react-router-dom";

function SignIn(props) {
  const inputfield = useRef(null);
  const {  userLogin, message } =
    useContext(TodoContext);

  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  const [mymessage, setmyMessage] = useState("");
  // const [formError, setFormError] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let errorData = {};

    errorData.email = [];

    if (!formdata.email) {
      errorData.email.push("please fill email");
    }
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (formdata.email) {
      if (!regex.test(formdata.email)) {
        errorData.email.push("invalid email");
      }
    }

    errorData.password = [];

    if (!formdata.password) {
      errorData.password.push("please fill password");
    }
    setErrors(errorData);
  };

  const isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  const onblurHandle = (e) => {
    const { name } = e.target;
    setDirty((dirty) => ({
      ...dirty,
      [name]: true,
    }));
    validate();
  };
  useEffect(validate, [formdata]);


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormdata((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const login = (e) => {
    e.preventDefault();
    if (isValid()) {
      userLogin(formdata);
    } else {
      const currValue = inputfield.current.value;
      if (!currValue) {
        Object.keys(dirty).forEach((item) => (dirty[item] = true));
      }
      setmyMessage(
        <div className="text-danger">please resolve the errors</div>
      );
    }
   
  };
  
  return (
    <div>
      <div className="conatiner-fluid ms-auto">
        <section className="signin">
          <div className="container">
            <div className="signup-content">
              <div className="signin-form">
                <form className=" form mt-5" onSubmit={login} noValidate>
                  <div className="mb-3">
                    <div className="form-group">
                      <label className="form-label fw-bold">
                        Username or Email address
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        ref={inputfield}
                        aria-describedby="emailHelp"
                        onChange={handleChange}
                        onBlur={onblurHandle}
                      />
                      {/* <p className="text-danger">{formError.email}</p> */}
                    </div>
                    <div className="text-danger">
                      {dirty["email"] && errors["email"][0]
                        ? errors["email"]
                        : ""}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <input
                      name="password"
                      type="password"
                      ref={inputfield}
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={handleChange}
                      onBlur={onblurHandle}
                      // onBlur = {()=>validations(formdata)}
                    />
                    {/* <p className="text-danger">{formError.password}</p> */}
                  </div>
                  <div className="text-danger">
                    {dirty["password"] && errors["password"][0]
                      ? errors["password"]
                      : ""}
                  </div>
                  <p className="text-dark">{message}</p>
                  <button type="submit" className="btn btn-dark">
                    SignIn
                  </button>
                  {mymessage}
                  <div>
                    <label className="form-check-label mt-5">
                      Forgot Username / Password?
                    </label>
                  </div>
                  <div></div>
                  <Link className="text-decoration-none" to="/SignUp">
                    <label className="form-check-label">
                      Click here to reset
                    </label>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="forms">
        <Outlet />
      </div>
    </div>
  );
}

export default SignIn;
