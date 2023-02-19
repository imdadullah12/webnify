import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const user_data = localStorage.getItem("user_data");
    if (user_data != null) {
      router.push("/home");
    }
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [loginButton, setLoginButton] = useState("Login");

  const validation = () => {
    if (email == "" && password == "") {
      toast("Email and password are required");
    } else if (email == "") {
      toast("Email is required");
    } else if (password == "") {
      toast("Password is required");
    } else {
      setLoginButton(<LoadingIcons.TailSpin height={25} stroke="#000" />);
      setTimeout(() => {
        setLoginButton("Login");
      }, 1000);
      //Prepare DB
      const regex = /^([^.]+)/;
      const match = domain.match(regex);
      const modified_domain = match ? match[1] : "";
      const database_name = "urtzsevs_" + modified_domain;
      console.log(database_name);
      axios(process.env.api_url + "/app/auth/teacher.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          db: database_name,
          email: email,
          password: password,
        },
      })
        .then(async function (response) {
          if (response.data.status == 401) {
            toast("Email or Password is Incorrect");
          } else {
            localStorage.setItem(
              "user_data",
              JSON.stringify({
                user_id: response.data.user.id,
                user_name: response.data.user.full_name,
                email: response.data.user.email,
                designation: response.data.user.designation,
                database: database_name,
              })
            );
            router.push("/home");
          }
        })
        .catch(function (error) {
          toast("Domain not found!", {
            icon: "❌",
          });
        });
    }
  };
  return (
    <>
      <div className="row m-0 imdos-bg-circle" style={{ minHeight: "100vh" }}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="card w-100 border py-5 imdos-bg-blur shadow">
            <div className="card-body text-center">
              <Image
                src="/webnify.png"
                width={200}
                height={200}
                alt="Logo"
                className="img-fluid mb-3 rounded"
              />
              <div className="form-inputs mt-3">
                <input
                  type="email"
                  className="form-control imdos-input my-3 shadow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control imdos-input my-3 shadow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="domain"
                  className="form-control imdos-input my-3 mb-0 shadow"
                  placeholder="Domain Name"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
                <p className="my-2 text-start" style={{ fontSize: 10 }}>
                  <small className="text-white">
                    Note: Domain should not contain www, http or https.
                  </small>
                </p>
                <button
                  className="btn btn-dark bg-white fw-bold text-dark border-0 w-100 imdos-50 shadow"
                  onClick={validation}
                >
                  {loginButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
