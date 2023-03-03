import React from "react";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div className="w-100">
      <div className="cardHeader d-flex pt-5 px-5 justify-content-between">
        <div className="text ">
          <h1>
            Advance care
            <br /> Trusted care
          </h1>
          <h5>
            We provide Healthcare Services for you and your loved one's.
            <br />
            Advanced and low-cost services is our motto.
          </h5>
          <button
            onClick={() => {
              navigate("/book/appointment");
            }}
            className="py-2 px-5 border rounded-5 mt-4"
          >
            Book appointment
          </button>
        </div>
        <div className="img-holder">
          <img src="https://img.freepik.com/premium-vector/flat-male-doctor-health-care-dentist-with-text-box-concept_148549-109.jpg"></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
