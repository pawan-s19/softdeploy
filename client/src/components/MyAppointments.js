import axios from "../axiosConfig/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyAppointments = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();

  let getAppointments = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get("/get/appointments");
      console.log(data);
      setAppointments(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  let deleteHandler = async (id) => {
    try {
      let { data } = await axios.get(`/appointment/${id}`);
      console.log(data);
      setDeleted(!deleted);
    } catch (err) {
      console.log(err);
    }
  };

  let updateAppointment = async (id) => {
    navigate(`/update/appointment/${id}`);
  };
  useEffect(() => {
    if (!props.user) {
      navigate("/login");
    }
    getAppointments();
  }, [props.user, deleted]);

  return (
    <div className="p-5">
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <>
          <h1>Your Appointments</h1>

          {appointments.length > 0 ? (
            <>
              {appointments.map((e) => (
                <div key={e._id} className="mt-4 table-responsive">
                  <table className="table table-hover ">
                    <thead className="thead-dark">
                      <tr>
                        <th style={{ width: "20em" }} scope="col">
                          Patient Name
                        </th>
                        <th style={{ width: "20em" }} scope="col">
                          E-mail
                        </th>
                        <th style={{ width: "20em" }} scope="col">
                          Phone
                        </th>
                        <th style={{ width: "20em" }} scope="col">
                          Address
                        </th>
                        <th style={{ width: "20%" }} scope="col">
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{e.name}</td>
                        <td>{e.contact.email}</td>
                        <td>{e.contact.phone}</td>
                        <td>{e.address}</td>
                        <td>
                          <button
                            className="btn btn-primary me-3"
                            onClick={() => {
                              updateAppointment(e._id);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteHandler(e._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          ) : (
            <h6>You have no appointments booked.</h6>
          )}
        </>
      )}
    </div>
  );
};

export default MyAppointments;
