import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/header";
import Moment from "react-moment";

const Result = () => {
  const router = useRouter();
  const [attendance, setAttendance] = useState([]);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      setUserData(JSON.parse(user_data) || {});
    }
  }, []);
  const apiUrl = process.env.api_url;
  const {
    category,
    medium,
    className: className,
    stream,
    section,
    date,
    sessionId,
    created_at,
  } = router.query;

  useEffect(() => {
    if (!userData.user_id) return;
    if (attendance == "") {
      axios(apiUrl + "app/fetch/fetching_student_attendace.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          db: userData && userData.database,
          category: category,
          medium: medium,
          class: className,
          stream: stream,
          section: section,
          session_id: sessionId,
        },
      }).then(function (response) {
        console.log(response.data);
        setAttendance(response.data);
      });
    }
  }, [
    category,
    className,
    medium,
    section,
    stream,
    apiUrl,
    sessionId,
    attendance,
    userData,
  ]);
  return (
    <>
      <Header />
      <div className="imdos-main">
        <div className="imdos-blur m-3 p-3 rounded shadow text-white">
          <p className="mb-0">Attendance Report</p>
          <p className="mb-0">
            <small>
              Date: {date} (<Moment format="dddd">{date}</Moment>)
            </small>
          </p>
          <p className="mb-0">
            <small>Class: {className}</small>
          </p>
          <p className="mb-0">
            <small>Category: {category}</small>
          </p>
          <p className="mb-0">
            <small>Medium: {medium}</small>
          </p>
          <p className="mb-0">
            <small>Section: {section}</small>
          </p>
          <p className="mb-0">
            <small>Stream: {stream}</small>
          </p>
        </div>
        <div className="imdos-blur m-3 p-3 rounded shadow text-white">
          <table className="table text-white table-responsive">
            <thead>
              <tr style={{ whiteSpace: "nowrap" }}>
                <th scope="col">Roll No</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((attendance) => {
                const { roll_no, status, name } = attendance;
                return (
                  <tr
                    key={roll_no}
                    valign="middle"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <th scope="row">{roll_no}</th>
                    <td>{name}</td>
                    <td width={100}>
                      <span
                        className={`ms-2 mb-0 badge bg-white ${
                          status == "present" ? "text-info" : "imdos-danger"
                        }`}
                      >
                        {status == "absent" ? "Absent" : "Present"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {attendance.length == 0 && (
            <p className="mb-0 text-center" style={{ fontSize: 13 }}>
              No Data Available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Result;
