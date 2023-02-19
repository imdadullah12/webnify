import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import Header from "../../../components/header";

const Result = () => {
  const router = useRouter();
  const [session, setSession] = useState([]);
  const {
    category,
    medium,
    className: className,
    stream,
    section,
  } = router.query;
  const apiUrl = process.env.api_url;

  const [userData, setUserData] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      setUserData(JSON.parse(user_data) || {});
    }
  }, []);

  useEffect(() => {
    if (!userData.user_id) return;
    if (session == "") {
      axios(apiUrl + "app/fetch/get_student_session.php", {
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
        },
      }).then(function (response) {
        console.log(response.data);
        setSession(response.data.data);
      });
    }
  }, [category, className, medium, section, stream, apiUrl, session, userData]);

  return (
    <>
      <Header />
      <div className="imdos-main">
        <div className="imdos-blur m-3 p-3 rounded shadow text-white">
          <p className="mb-0">Attendance Sessions</p>
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
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Day</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {session.map((session) => {
                const { id, holiday, created_at } = session;
                return (
                  <tr key={id} valign="middle" style={{ whiteSpace: "nowrap" }}>
                    <th scope="row">{created_at}</th>
                    <td>
                      <Moment format="dddd">{created_at}</Moment>
                    </td>
                    <td width={100}>
                      <button
                        className={`ms-2 mb-0 btn btn-sm ${
                          holiday == 1
                            ? "bg-warning disabled"
                            : "bg-info text-white"
                        }`}
                        onClick={() => {
                          router.push(
                            "/attendance-report/student/result?category=" +
                              category +
                              "&medium=" +
                              medium +
                              "&className=" +
                              className +
                              "&stream=" +
                              stream +
                              "&section=" +
                              section +
                              "&sessionId=" +
                              id +
                              "&date=" +
                              created_at
                          );
                        }}
                      >
                        {holiday == 1 ? "Holiday" : "View List"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {session.length == 0 && (
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
