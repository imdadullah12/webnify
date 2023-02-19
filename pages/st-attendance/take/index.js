import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Header from "../../components/header";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

const TakeAttendance = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      setUserData(JSON.parse(user_data));
    }
  }, []);
  const router = useRouter();
  const apiUrl = process.env.api_url;
  const { category, medium, class: className, stream, section } = router.query;

  const [students, setStudents] = useState([]);
  const [sessionID, setSessionID] = useState("");
  const [status, setStatus] = useState("");

  const handleComplete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className=".container-fluid">
            <h1 className="text-danger">Are you sure?</h1>
            <p>You want to Complete Attendace?</p>
            <button
              onClick={onClose}
              className="btn btn-sm imdos-success-btn me-2"
            >
              No
            </button>
            <button
              className="btn btn-sm imdos-info-btn"
              onClick={() => {
                axios(
                  process.env.api_url + "app/update/complete_attendance.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: {
                      db: process.env.database,
                      session_id: sessionID,
                      holiday: 0,
                    },
                  }
                ).then(function (response) {
                  if ((response.data = "Attendace Completed")) {
                    toast("Attendance Completed");
                    router.push("/home");
                    onClose();
                  }
                });
              }}
            >
              Yes, Confirm!
            </button>
          </div>
        );
      },
    });
  };

  const handleHoliday = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className=".container-fluid">
            <h1 className="text-danger">Are you sure?</h1>
            <p>You want to Mark as Holiday?</p>
            <button
              onClick={onClose}
              className="btn btn-sm imdos-success-btn me-2"
            >
              No
            </button>
            <button
              className="btn btn-sm imdos-info-btn"
              onClick={() => {
                axios(
                  process.env.api_url + "app/update/complete_attendance.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: {
                      db: process.env.database,
                      session_id: sessionID,
                      holiday: 1,
                    },
                  }
                ).then(function (response) {
                  if ((response.data = "Attendace Completed")) {
                    toast("Attendance Completed");
                    router.push("/home");
                    onClose();
                  }
                });
              }}
            >
              Yes, Confirm!
            </button>
          </div>
        );
      },
    });
  };

  const handleAttendance = (event) => {
    const attendance = event.target.value;
    axios(process.env.api_url + "app/insert/insert_attendance.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        db: process.env.database,
        attendance: attendance,
        session_id: sessionID,
      },
    }).then(function (response) {});
  };

  useEffect(() => {
    if (students == "") {
      axios(apiUrl + "fetch/table/app/student.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          db: process.env.database,
          category: category,
          medium: medium,
          class: className,
          stream: stream,
          section: section,
        },
      }).then(function (response) {
        setStudents(response.data);
      });
    }
    if (
      (category, medium, className, stream, section != undefined) &&
      students.length != 0
    ) {
      axios(process.env.api_url + "/app/insert/attendance_session.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          db: process.env.database,
          taken_by: userData.user_id,
          category: category,
          medium: medium,
          class: className,
          stream: stream,
          section: section,
        },
      }).then(function (response) {
        setSessionID(response.data.data.id);
        setStatus(response.data.data.status);
      });
    }
  }, [
    apiUrl,
    category,
    className,
    medium,
    section,
    stream,
    students,
    userData,
  ]);
  return (
    <>
      <Header />
      <div className="imdos-main">
        {students.length != 0 && status != 1 && (
          <div className="imdos-blur m-3 p-2 rounded shadow">
            <h5 className="text-white text-center mb-0">Today : 23-02-2099</h5>
            <button
              className="btn imdos-blur mt-3 w-100"
              onClick={handleHoliday}
            >
              Mark all as Holiday
            </button>
          </div>
        )}

        {students.length == 0 && (
          <div className="imdos-blur m-3 p-2 rounded shadow">
            <p className="text-white text-center mb-0 p-3">
              There is no students data available
            </p>
          </div>
        )}

        {students.length != 0 && status == 1 && (
          <div className="imdos-blur m-3 p-2 rounded shadow">
            <p className="text-white text-center mb-0 p-3">
              Attendance is already taken
            </p>
          </div>
        )}

        {students &&
          status == 0 &&
          students.map((students, index) => (
            <div className="imdos-blur m-3 p-3 rounded shadow" key={index}>
              <div className="d-flex justify-content-between">
                <div className="name">
                  <h5 className="text-white text-start mb-0 mb-0">
                    {students.name}
                  </h5>
                  <p className="text-white mb-2">Roll No: {students.roll_no}</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={"attendance-" + index}
                      id={"present-" + index}
                      value={
                        "present_" + students.suid + "_" + students.roll_no
                      }
                      onChange={handleAttendance}
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor={"present-" + index}
                    >
                      Present
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={"attendance-" + index}
                      id={"absent-" + index}
                      value={"absent_" + students.suid + "_" + students.roll_no}
                      onChange={handleAttendance}
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor={"absent-" + index}
                    >
                      Absent
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={"attendance-" + index}
                      id={"late-" + index}
                      value={"late_" + students.suid + "_" + students.roll_no}
                      onChange={handleAttendance}
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor={"late-" + index}
                    >
                      Late
                    </label>
                  </div>
                </div>
                <div className="image">
                  <Image
                    src={process.env.image_url + students.image}
                    alt="Photo"
                    width={150}
                    height={150}
                    className="img-fluid border w-100"
                  />
                </div>
              </div>
            </div>
          ))}

        {students.length != 0 && status == 0 && (
          <div className="imdos-blur m-3 p-2 rounded shadow">
            <p className="text-white text-center mb-0 px-2">
              If your attendace is completed, then kindly click the button below
            </p>
            <button
              className="btn imdos-blur mt-3 w-100 text-white"
              onClick={handleComplete}
            >
              Complete attendace
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TakeAttendance;
