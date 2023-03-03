import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import axios from "./axiosConfig/axios";
import BookAppointment from "./components/BookAppointment";
import MyAppointments from "./components/MyAppointments";
import Update from "./components/Update";
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  let getUser = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get("/getuser");
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      setUser(null);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{ height: "70vh" }}
          className="d-flex align-items-center justify-content-center mt-5"
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home user={user} />}></Route>
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/register"
              element={<Register user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/book/appointment"
              element={<BookAppointment user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/my/appointments"
              element={<MyAppointments user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/update/appointment/:id"
              element={<Update user={user} setUser={setUser} />}
            ></Route>
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
