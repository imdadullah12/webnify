import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { GrMapLocation } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import LoadingIcons from "react-loading-icons";
import { toast } from "react-toastify";
import { BsCheck2All } from "react-icons/bs";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
const UserAttendance = () => {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [attText, setAttText] = useState("Give Attendance");
  const [pinchText, setPinchText] = useState("Pinch Out");
  const [disabled, setDisabled] = useState(false);
  const [coordinates, setCoordinates] = useState();
  const [attendaceCheck, setAttendaceCheck] = useState("d-none");
  const schoolLat = 26.1586944;
  const schoolLon = 91.7635072;
  // const schoolLat = 26.1586956;
  // const schoolLon = 91.766728;
  const latThreshold = 0.01;
  const lonThreshold = 0.01;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      setUserData(JSON.parse(user_data));
    }
  }, []);
  useEffect(() => {
    if (userData && userData != "") {
      axios(process.env.api_url + "app/insert/get_teacher_attendance.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          db: process.env.database,
          user_id: userData.user_id,
        },
      }).then(function (response) {
        setAttendaceCheck(response.data.data);
      });
    }
  }, [userData]);

  const handleAttendance = () => {
    setAttText(<LoadingIcons.TailSpin height={50} />);
    navigator.geolocation.getCurrentPosition(success, fail);
    function success(position) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      console.log(position.coords.latitude, position.coords.longitude);
      if (
        Math.abs(position.coords.latitude - schoolLat) < latThreshold &&
        Math.abs(position.coords.longitude - schoolLon) < lonThreshold
      ) {
        axios(process.env.api_url + "app/insert/teacher_attendance.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            db: process.env.database,
            user_id: userData.user_id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            action: "pinch_in",
            pinch_in: moment().format("HH:mm"),
          },
        }).then(function (response) {
          if (response.data.data.status == 201) {
            toast("Attendace Captured!");
            setAttText(<BsCheck2All height={50} />);
            setDisabled(true);
            router.push("/home");
          } else {
            toast("Something went wrong");
            setAttText(<ImCross height={50} />);
            setDisabled(false);
          }
        });
      } else {
        toast("You are not at school radius!");
        setAttText(<ImCross height={50} />);
        setDisabled(false);
      }
    }

    function fail() {
      // Could not obtain location
      toast("Please allow location");
      setAttText("Give Attendance");
    }
  };

  const handlePinchOut = () => {
    setAttText(<LoadingIcons.TailSpin height={50} />);
    navigator.geolocation.getCurrentPosition(success, fail);
    function success(position) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      if (
        Math.abs(position.coords.latitude - schoolLat) < latThreshold &&
        Math.abs(position.coords.longitude - schoolLon) < lonThreshold
      ) {
        axios(process.env.api_url + "app/insert/teacher_attendance.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            db: process.env.database,
            user_id: userData.user_id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            action: "pinch_out",
            pinch_out: moment().format("HH:mm"),
          },
        }).then(function (response) {
          if (response.data.data.status == 201) {
            toast("Pinch Out!");
            setAttText(<BsCheck2All height={50} />);
            setDisabled(true);
            router.push("/home");
          } else {
            toast("Something went wrong");
            setAttText(<ImCross height={50} />);
            setDisabled(false);
          }
        });
      } else {
        toast("You are not at school radius!");
        setAttText(<ImCross height={50} />);
        setDisabled(false);
      }
    }
    function fail() {
      // Could not obtain location
      toast("Please allow location");
      setAttText("Give Attendance");
    }
  };

  return (
    <>
      <Header />
      <div className="imdos-main">
        <div
          className={`imdos-blur m-3 rounded shadow p-3 ${
            attendaceCheck && attendaceCheck != "not_created"
              ? "d-none"
              : "d-block"
          }`}
        >
          <p className="text-white">Give your attendance</p>
          <hr />
          <GrMapLocation className="text-white h1 me-2" />
          <br />
          <small className="text-white">
            Note: <br />
            1. Your location will be compared while you give your attendance{" "}
            <br />
            2. Make sure you are within the school radius otherwise your
            attendace will not be taken
          </small>
          <div className="text-center mt-3">
            <button
              className="imdos-blur btn btn-lg text-white"
              onClick={handleAttendance}
              disabled={disabled ? true : false}
            >
              {attText}
            </button>
          </div>
        </div>
        <div
          className={`imdos-blur m-3 rounded shadow p-3 ${
            attendaceCheck && attendaceCheck == "not_pinch_out"
              ? "d-block"
              : "d-none"
          }`}
        >
          <p className="text-white">Pinch Out from School</p>
          <hr />
          <small className="text-white">
            You have already gave your attendance, It is the time of your pinch
            out, Click the below button to pinch out
          </small>
          <div className="text-center mt-3">
            <button
              className="imdos-blur btn btn-lg text-white"
              onClick={handlePinchOut}
              disabled={disabled ? true : false}
            >
              {pinchText}
            </button>
          </div>
        </div>
        <div
          className={`imdos-blur m-3 rounded shadow p-3 ${
            attendaceCheck && attendaceCheck == "already_created"
              ? "d-block"
              : "d-none"
          }`}
        >
          <p className="text-white">Attendance Already Created</p>
          <hr />
          <small className="text-white">
            You have completed your attendance both Pinch In and Pinch Out
          </small>
          <div className="text-center mt-3">
            <BsCheck2All
              size={150}
              className="border rounded-circle p-3 text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAttendance;
