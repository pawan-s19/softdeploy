import React from "react";
import { NavLink } from "react-router-dom";
import axios from "../axiosConfig/axios";
const NavBar = (props) => {
  let logOutHandler = async () => {
    let data = await axios.get("/logout");
    props.setUser(null);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3" to="/">
          MediCare
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item ">
              <NavLink className="nav-link" to="/my/appointments">
                Appointments
              </NavLink>
            </li>
          </ul>
          {props.user ? (
            <NavLink
              className="btn btn-outline-success"
              onClick={logOutHandler}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink className="btn btn-outline-success" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
