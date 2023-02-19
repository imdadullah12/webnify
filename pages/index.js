import Head from "next/head";
import React from "react";
import Login from "./auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Main = () => {
  return (
    <>
      <Login />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
      />
    </>
  );
};

export default Main;
