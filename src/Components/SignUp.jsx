import React, { useEffect, useRef } from "react";
import { useState, useContext } from "react";
import TodoContext from "../context/TodoContext";
import { Outlet } from "react-router-dom";

function SignUp(props) {
  const { addUser } = useContext(TodoContext);

  const inputField = useRef(null);

  const [errors, setError] = useState({
    username: [],
    email: [],
    password: [],
  });

  const [dirty, setDirty] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [message, setMessage] = useState("");

  const validate = () => {
    let errorsData = {};

    errorsData.email = [];

    if (!formdata.email) {
      errorsData.email.push("Please provide email");
    }
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (formdata.email) {
      if (!regex.test(formdata.email)) {
        errorsData.email.push("Please enter valid email");
      }
    }

    errorsData.password = [];
    if (!formdata.password) {
      errorsData.password.push("Please provide password");
    }

    errorsData.username = [];
    if (!formdata.username) {
      errorsData.username.push("Please provide username");
    }
    setError(errorsData);
  };

  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  const onblurHandle = (event) => {
    const { name } = event.target;
    setDirty((dirty) => ({
      ...dirty,
      [name]: true,
    }));
    validate();
  };

  // const myDate = new Date();
  // var uid = myDate.getTime().toString();

  const [formdata, setFormdata] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(validate, [formdata]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormdata((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const onRegister = (e) => {
    e.preventDefault();

    if (isValid()) {
      addUser(formdata);
    } else {
      const currValue = inputField.current.value;
      if (!currValue) {
        Object.keys(dirty).forEach((item) => (dirty[item] = true));
      }
      setMessage(
        <div className="text-danger">Please resolve errors in the form</div>
      );
    }
  };

  return (
    <div>
      <div className="conatiner-fluid ms-auto">
        <section className="signin">
          <div className="container">
            <div className="signup-content">
              <form className=" form mt-5" onSubmit={onRegister}>
                <div className="mb-3">
                  <div className="form-group">
                    <label className="form-label">
                      <b>Username</b>
                    </label>
                    <input
                      name="username"
                      type="Username"
                      ref={inputField}
                      className="form-control"
                      onChange={handleChange}
                      onBlur={onblurHandle}
                    />
                    <div className="text-danger">
                      {dirty["username"] && errors["username"][0]
                        ? errors["username"]
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <b>Email</b>
                  </label>
                  <input
                    name="email"
                    type="email"
                    ref={inputField}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={onblurHandle}
                  />
                  <div className="text-danger">
                    {dirty["email"] && errors["email"][0]
                      ? errors["email"]
                      : ""}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <b> Password</b>
                  </label>
                  <input
                    name="password"
                    type="password"
                    ref={inputField}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={onblurHandle}
                  />
                  <div className="text-danger">
                    {dirty["password"] && errors["password"][0]
                      ? errors["password"]
                      : ""}
                  </div>
                </div>

                  <button type="submit" className="btn btn-dark">
                    SignUp
                  </button>
                  {message}
                
                <div>
                  <label className="form-check-label mt-5">
                    Having Problem in Registering?
                  </label>
                </div>
                <div>
                  <label className="form-check-label">
                    <a className="text-decoration-none" href="">
                      Click here{" "}
                    </a>{" "}
                    for help
                  </label>
                </div>
              </form>
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

export default SignUp;
