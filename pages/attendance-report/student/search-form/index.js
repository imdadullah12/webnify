import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchForm = () => {
  const router = useRouter();
  const apiUrl = process.env.api_url;
  const [stream, setStream] = useState([]);
  const [category, setCategory] = useState([]);
  const [medium, setMedium] = useState([]);
  const [classes, setClasses] = useState([]);
  const [streamDisplay, setStreamDisplay] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("None");
  const [selectedSection, setSelectedSection] = useState("");

  const [userData, setUserData] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      setUserData(JSON.parse(user_data) || {});
    }
  }, []);

  function handleCategory(event) {
    setSelectedCategory(event.target.value);
  }

  function handleMedium(event) {
    setSelectedMedium(event.target.value);
  }

  function handleClass(event) {
    setSelectedClass(event.target.value);
  }

  function handleClass(event) {
    setSelectedClass(event.target.value);
  }

  function handleStream(event) {
    setSelectedStream(event.target.value);
  }

  function handleSection(event) {
    setSelectedSection(event.target.value);
  }

  useEffect(() => {
    if (!userData.user_id) return;
    axios(apiUrl + "fetch/data/category.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        db: userData && userData.database,
      },
    }).then(function (response) {
      setCategory(response.data);
    });
    if (selectedCategory != "") {
      axios(apiUrl + "fetch/data/medium.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          db: userData && userData.database,
          category: selectedCategory,
        },
      }).then(function (response) {
        setMedium(response.data.message);
        if (selectedCategory == "Upper Section") {
          setStreamDisplay(true);
          axios(apiUrl + "fetch/data/stream.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              db: userData && userData.database,
            },
          }).then(function (response) {
            setStream(response.data.message);
          });
        } else {
          setStreamDisplay(false);
        }
      });
    } else {
      setMedium([]);
    }
  }, [selectedCategory, apiUrl, userData]);

  useEffect(() => {
    if (!userData.user_id) return;
    axios(apiUrl + "fetch/data/class.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        db: userData && userData.database,
        category: selectedCategory,
      },
    }).then(function (response) {
      if (response.data.status === 404) {
        setClasses([]);
      } else {
        setClasses(response.data.message);
      }
    });
  }, [selectedCategory, apiUrl, userData]);

  return (
    <div className="imdos-main">
      <div className="imdos-blur m-3 rounded shadow p-3">
        <h6 className="text-white mb-3">Fill up these details</h6>
        <div className="form-details">
          <div className="form-group mb-2">
            <small className="text-white">Select Category</small>
            <select className="form-control" id="" onChange={handleCategory}>
              <option value="">Select Option</option>
              {category &&
                category.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group mb-2">
            <small className="text-white">Select Medium</small>
            <select className="form-control" id="" onChange={handleMedium}>
              <option value="">Select Option</option>
              {medium &&
                medium.map((medium, index) => (
                  <option key={index} value={medium.value}>
                    {medium.label}
                  </option>
                ))}
            </select>
          </div>
          <div className={`form-group mb-2 ${!streamDisplay ? "d-none" : ""}`}>
            <small className="text-white">Select Stream</small>
            <select className="form-control" id="" onChange={handleStream}>
              <option value="">Select Option</option>
              {stream &&
                stream.map((stream, index) => (
                  <option key={index} value={stream.value}>
                    {stream.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group mb-2">
            <small className="text-white">Select Class</small>
            <select className="form-control" id="" onChange={handleClass}>
              <option value="">Select Option</option>
              {classes &&
                classes.map((classes, index) => (
                  <option key={index} value={classes.value}>
                    {classes.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group mb-2">
            <small className="text-white">Select Section</small>
            <select className="form-control" id="" onChange={handleSection}>
              <option value="">Select Option</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>
          </div>
          <button
            className="btn btn-secondary w-100 mt-2"
            onClick={() => {
              if (
                selectedCategory &&
                selectedMedium &&
                selectedStream &&
                selectedSection != ""
              ) {
                router.push(
                  "/attendance-report/student/session?category=" +
                    selectedCategory +
                    "&medium=" +
                    selectedMedium +
                    "&className=" +
                    selectedClass +
                    "&stream=" +
                    selectedStream +
                    "&section=" +
                    selectedSection
                );
              }
            }}
          >
            Get Attendance Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
