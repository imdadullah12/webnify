import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { FiCheckCircle, FiEdit3 } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsCalendar2Check } from "react-icons/bs";
import Link from "next/link";
const Home = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      setUserData(JSON.parse(user_data));
    }
  }, []);
  return (
    <>
      <Header />
      <div className="imdos-main">
        <div className="imdos-blur m-3 p-3 rounded shadow text-white">
          <h6 className="mb-0">Hello,</h6>
          <h3 className="mb-0">{userData && userData.user_name}</h3>
          <p className="mb-0">{userData && userData.designation}</p>
        </div>
        <div className="row m-1 my-0">
          <div className="col-12 mb-3">
            <Link href="st-attendance" className="text-decoration-none">
              <div className="imdos-blur rounded shadow text-white p-3 px-3">
                <FiCheckCircle className="h1" />
                <p className="mb-0">Take Student Attendance</p>
              </div>
            </Link>
          </div>
          <div className="col-12 mb-3">
            <Link href="us-attendance" className="text-decoration-none">
              <div className="imdos-blur rounded shadow text-white p-3 px-3">
                <FiEdit3 className="h1" />
                <p className="mb-0">Give Your Attendance</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="row m-1 my-0">
          <div className="col-12 mb-3">
            <Link
              href="attendance-report/student"
              className="text-decoration-none"
            >
              <div className="imdos-blur rounded shadow text-white p-3 px-3">
                <AiOutlineCalendar className="h1" />
                <p className="mb-0">Student Attendance Report</p>
              </div>
            </Link>
          </div>
          <div className="col-12 mb-3">
            <Link
              href="attendance-report/teacher"
              className="text-decoration-none"
            >
              <div className="imdos-blur rounded shadow text-white p-3 px-3">
                <BsCalendar2Check className="h1" />
                <p className="mb-0">Your Attendance Report</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
