import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

import axios from "../axiosConfig/axios";
const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.user) {
      navigate("/");
    }
  }, [props.user]);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      let { data } = await axios.post("/login", formData);
      props.setUser(data.user);
      setLoading(false);
    } catch (err) {
      if (err) {
        setLoading(false);
        setError(err.response.data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  };
  return (
    <>
      {error ? (
        <ToastContainer className="m-5" position="bottom-end">
          {" "}
          <Toast autohide>
            <Toast.Header>
              <strong className="me-auto">Sorry !</strong>
            </Toast.Header>
            <Toast.Body>{error} </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
      <div className=" d-flex mt-5 justify-content-center ">
        <form className=" mt-5 p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label mt-5">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              {...register("password", { required: true })}
            />
          </div>

          <div className="d-flex justify-content-center">
            {loading ? (
              <div className="spinner-border mt-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
            )}
          </div>

          <h6 className="mt-5 text-center">
            Don't have an account? <NavLink to="/register">Register</NavLink>
          </h6>
        </form>
      </div>
    </>
  );
};

export default Login;
