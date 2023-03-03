import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import axios from "../axiosConfig/axios";
const BookAppointment = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const navigate = useNavigate();

  let onSubmit = async (formData) => {
    try {
      setLoading(true);
      let { data } = axios.post("/create/appointment", formData);
      setLoading(false);
      setIsBooked(true);
      reset();
      setTimeout(() => {
        setIsBooked(false);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!props.user) {
      navigate("/login");
    }
  }, [props.user, reset]);

  return (
    <div>
      {" "}
      {error ? (
        <ToastContainer className="m-5" position="bottom-end">
          {" "}
          <Toast autohide>
            <Toast.Header>
              <strong className="me-auto">Sorry !</strong>
            </Toast.Header>
            <Toast.Body>Unexpected error occured </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
      <div className=" d-flex  justify-content-center ">
        <form className=" mt-3 p-5" onSubmit={handleSubmit(onSubmit)}>
          <h3>Book a appointment with us !</h3>
          <div className=" mb-3">
            <label for="exampleInputName1" class="form-label mt-5">
              Patient name
            </label>
            <input
              name="patientName"
              type="text"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="NameHelp"
              {...register("patientName", { required: true })}
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
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="number"
              class="form-control"
              id="exampleInputPassword1"
              {...register("phoneNumber", { required: true })}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Address
            </label>
            <input
              name="address"
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              {...register("address", { required: true })}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Pincode
            </label>
            <input
              name="pincode"
              type="number"
              class="form-control"
              id="exampleInputPassword1"
              {...register("pincode", { required: true })}
            />
          </div>
          <div className="d-flex justify-content-center">
            {loading ? (
              <div class="spinner-border mt-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                {isBooked ? (
                  <div className="w-100 btn btn-success">Booked</div>
                ) : (
                  <button type="submit" class="btn btn-primary mt-3">
                    Book
                  </button>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
