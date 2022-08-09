import React, { useState,  useEffect } from "react";
// import TodoContext from '../context/TodoContext'
import { Link, Outlet, useNavigate } from "react-router-dom";
import illustration from "../illustration.png";
// import ReducerComponent from "./ReducerComponent";

function Home() {

  // const [isActive, setIsActive] = useState("false");

  // const active = "bg-white text-primary";
  // const inactive = "bg-primary text-white";

  // const toggleClass = () => {
  //   setIsActive(!isActive);
  // };

let navigate = useNavigate()

  useEffect(()=>{
navigate('/SignIn')
  },[])

  const [background, setBackground] = useState("white");
  const [color, setColor] = useState("black");
  const [background1, setBackground1] = useState("black");
  const [color1, setColor1] = useState("white");

  const styleSheet = () => {
    setBackground("white");
    setColor("black");
    setBackground1("black");
    setColor1("white");
  };

  const stylish = () => {
    setBackground1("white");
    setColor1("black");
    setBackground("black");
    setColor("white");
  };

  const style = {
    backgroundColor: `${background}`,
    color: `${color}`,
  };

  const solid = {
    backgroundColor: `${background1}`,
    color: `${color1}`,
  };


  return (
    <div className="container-fluid h-100  coloring">
      <div className="row align-items-center h-100">
        <div className="col-lg-6 bg-primary text-white h-100 text-center d-flex flex-column justify-content-center align-items-center">
          <h1 className="home-title display-6">
            An App to 
            <br /> make your life  
            <br />
            <span className="display-2">easy</span>
          </h1>
          <img
            className="illustration mt-5"
            src={illustration}
            alt="illustration"
          />
       
        </div>
        <div className="col-lg-6 ">
          <div className="row">
            <div className="col-8 offset-2">
              <div className="card border-0 shadow-sm rounded-0">
                <div className="card-header d-flex p-0 border-0 rounded-0 text-center">
                  <Link
                    className="py-2 px-3 w-50"
                    to="/SignIn"
                    style={style}
                    onClick={() => styleSheet()}
                  >
                    Login
                  </Link>
                  <Link
                    className="py-2 px-3 w-50"
                    to="/SignUp"
                    style={solid}
                    onClick={() => stylish()}
                  >
                    Register
                  </Link>
                </div>
                <div className="card-body">
                  <Outlet  />
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>

      {/* <div className="form-panel"> */}
      {/* <Link to= "SignIn">SignIn</Link>
          <Link to= "SignUp">SignUp</Link> */}
      {/* <div className="container d-flex w-50">
          <Link
            className="col-6 w-50 px-5 py-4 text-decoration-none"
            to="SignIn"
            style={style}
            onClick={() => styleSheet("white", "black")}
          >
            <h2 className="px-3 ">Sign In</h2>
          </Link>
          <Link
            className="col-6 p-4 text-decoration-none"
            to="SignUp"
            style={solid}
            onClick={() => stylish("white", "black")}
          >
            <h2 className="px-5">Sign up</h2>
          </Link>
        </div>
        <div className="forms">
          <Outlet />
        </div>
      </div> */}

      {/* <button onClick={updateCount}>Counter</button> */}
   
    </div>
  );
}

export default Home;
