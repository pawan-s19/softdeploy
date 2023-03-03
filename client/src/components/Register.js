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
      let { data } = await axios.post("/register", formData);
      setLoading(false);
      props.setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.response.data.keyPattern);
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 2000);
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
            <Toast.Body>Username or Email already exists . </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}

      <div className=" d-flex mt-5 justify-content-center ">
        <form className=" mt-5 p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className=" mb-3">
            <label for="exampleInputName1" class="form-label mt-5">
              Name
            </label>
            <input
              name="name"
              type="text"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="NameHelp"
              {...register("name", { required: true })}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              name="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              {...register("email", { required: true })}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              {...register("password", { required: true })}
            />
          </div>

          <div className="d-flex justify-content-center">
            {loading ? (
              <div class="spinner-border mt-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button type="submit" class="btn btn-primary mt-3">
                Register
              </button>
            )}
          </div>

          <h6 className="mt-5 text-center">
            Already Registered? <NavLink to="/login">Login</NavLink>
          </h6>
        </form>
      </div>
    </>
  );
};

export default Login;
