import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import axios from "axios";
import Moment from "react-moment";
const Report = () => {
  const [attendance, setAttendance] = useState([]);
  const [user, setUser] = useState("");
  const apiUrl = process.env.api_url;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      setUser(JSON.parse(user_data) || {});
    }
  }, []);

  useEffect(() => {
    if (!user.user_id) return;

    axios(apiUrl + "app/fetch/fetching_teacher_attendance.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        user_id: user.user_id,
        db: user && user.database,
      },
    }).then(function (response) {
      console.log(response.data);
      setAttendance(response.data);
    });
  }, [user, apiUrl]);
  return (
    <>
      <Header />
      <div className="imdos-main">
        <p className="text-white text-center mt-3">
          {" "}
          Showing attendance results for <Moment format="MMMM"></Moment>
        </p>
        <div className="imdos-blur m-3 p-3 rounded shadow text-white">
          <table className="table text-white">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Day</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendance).map(([date, status]) => (
                <tr key={date}>
                  <th scope="row">{date}</th>
                  <td>
                    <Moment format="ddd">{date}</Moment>
                  </td>
                  <td>
                    <span
                      className={`ms-2 mb-0 badge bg-white ${
                        status == "Present"
                          ? "imdos-success"
                          : status == "Holiday"
                          ? "text-info"
                          : "imdos-danger"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
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

export default Report;
