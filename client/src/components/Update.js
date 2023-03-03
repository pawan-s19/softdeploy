import React, { useEffect, useImperativeHandle, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import axios from "../axiosConfig/axios";
const Update = (props) => {
  const [appointment, setAppointment] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [formDets, setFormDets] = useState({
    patientName: "",
    email: "",
    phoneNumber: "",
    address: "",
    pincode: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  let getAppointment = async () => {
    try {
      let { data } = await axios.get(`/single/${id}`);

      setAppointment(data);
      setFormDets({
        patientName: data.name,
        email: data.contact.email,
        phoneNumber: data.contact.phone,
        address: data.address,
        pincode: data.pincode,
      });
    } catch (err) {
      console.log(err);
    }
  };

  let onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      let { data } = axios.post(`/update/appointment/${id}`, formDets);

      setLoading(false);
      setIsBooked(true);
      setFormDets({
        patientName: "",
        email: "",
        phoneNumber: "",
        address: "",
        pincode: "",
      });

      setTimeout(() => {
        setIsBooked(false);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  let changeHandler = (e) => {
    console.log(e);
    setFormDets({ ...formDets, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!props.user) {
      navigate("/login");
    }
    getAppointment();
  }, [props.user, id]);

  return (
    <>
      {!appointment ? (
        <div class="spinner-border m-5" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
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
            <form className=" mt-3 p-5" onSubmit={onSubmit}>
              <h3>Update your Appointment !</h3>
              <div className=" mb-3">
                <label for="exampleInputName1" class="form-label mt-5">
                  Patient name
                </label>
                <input
                  value={formDets && formDets.patientName}
                  name="patientName"
                  type="text"
                  class="form-control"
                  id="exampleInputName1"
                  aria-describedby="NameHelp"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  value={formDets && formDets.email}
                  name="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Phone Number
                </label>
                <input
                  value={formDets && formDets.phoneNumber}
                  name="phoneNumber"
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Address
                </label>
                <input
                  value={formDets && formDets.address}
                  name="address"
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Pincode
                </label>
                <input
                  value={formDets && formDets.pincode}
                  name="pincode"
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={changeHandler}
                  required
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
                      <div className="w-100 btn btn-success">Updated</div>
                    ) : (
                      <button type="submit" class="btn btn-primary mt-3">
                        Update
                      </button>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
