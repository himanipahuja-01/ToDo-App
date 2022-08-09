// import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { FaHome, FaReadme, FaUserAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";
import { useNavigate } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";


function Navigation(props) {
  const {  loggedUser } = useContext(TodoContext);

  const [loggedState, setLoggedState] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedUser.isLoggedIn) {
      localStorage.setItem("userState", JSON.stringify(loggedUser));
    }
    let localData = JSON.parse(localStorage.getItem("userState"));
    setLoggedState(localData);
  }, [loggedUser]);


  const logout = () =>{
    localStorage.removeItem("userState");
    setLoggedState("");
    navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              
              {
                !loggedState && (
                  <>
                  <li className="nav-item">
                  <Link className="nav-link black" to="/">
                  <FaHome />
                  Home
                </Link>
              </li>
            
                  </>
                )
              }

              <li className="nav-item">
                <Link className="nav-link black" to="about">
                  <FaReadme />
                  About
                </Link>
              </li>
               

              {/* <li class="nav-item">
                <Link class="nav-link" to="SignUp">SignUp
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="SignIn">SignIn</Link>
              </li> */}
              {loggedState && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link black" to="UserList">
                      UserList
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link black" to="CreateTask">
                      CreateTask
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link black" to="TaskList">
                      TaskList
                    </Link>
                  </li>

                  <Link className="nav-link black" to="/About">
                    <span>{loggedState.currentUserName}</span>
                  </Link>

                  <Link className="nav-link black" to="/">
                    <span className="icon" onClick={logout}>
                      Logout
                    </span>
                  </Link>

                  {/* <li className="nav-item dropdown">
          <button className="dropdown-toggle" type="button" id="nav-dropdown" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user"></i> 
          {loggedState.currentUserName}</button>            
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="nav-dropdown">
              <li><NavLink className="dropdown-item" to="profile">Profile</NavLink> </li>
              <li className="dropdown-item logout" onClick={logout}>Logout</li>
            </ul>
          </li> */}

                  <Nav>
                    <NavDropdown title={<FaUserAlt />}>
                      <NavDropdown.Item href={`/Useredit/${loggedState.currentUserId}`}>
                        View Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
