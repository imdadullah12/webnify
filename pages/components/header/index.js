import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FiHome,
  FiGrid,
  FiCalendar,
  FiUser,
  FiLogOut,
  FiAlignRight,
  FiArrowLeftCircle,
} from "react-icons/fi";

const Header = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const user_data = localStorage.getItem("user_data");
    if (user_data == null) {
      router.push("/");
    }
  }
  const handleLogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="container-fluid">
            <h1 className="text-danger">Are you sure?</h1>
            <p>You want to Logout?</p>
            <button
              onClick={onClose}
              className="btn btn-sm imdos-success-btn me-2"
            >
              No
            </button>
            <button
              className="btn btn-sm imdos-info-btn"
              onClick={() => {
                localStorage.removeItem("user_data");
                router.push("/");
                onClose();
              }}
            >
              Yes, Logout!
            </button>
          </div>
        );
      },
    });
  };
  return (
    <>
      <div className="imdos-blur imdos-footer position-absolute m-0 top-0 w-100 ">
        <div className="m-0 mx-3 justify-content-between alignt-items-center d-flex py-3">
          {router.pathname == "/home" && (
            <h5 className="mt-1 text-white">WEBNIFY</h5>
          )}
          {router.pathname != "/home" && (
            <div
              className="humburger p-1 rounded"
              onClick={() => window.history.back()}
            >
              <FiArrowLeftCircle
                style={{
                  fontSize: 30,
                }}
                className="mb-0 text-white"
              />
            </div>
          )}
        </div>
      </div>
      <div className="imdos-blur imdos-footer footer-section position-absolute m-0 bottom-0 w-100">
        <div className="m-0 justify-content-evenly alignt-items-center d-flex">
          <Link href="/home">
            <div
              className="imdos-blur p-imdos-footer my-2 rounded"
              style={{ paddingTop: "13px !important" }}
            >
              <FiHome className="h4 m-0 text-white" />
            </div>
          </Link>
          <div
            className="border p-imdos-footer my-2 rounded"
            style={{ paddingTop: "13px !important" }}
          >
            <FiGrid className="h4 m-0 text-white" />
          </div>
          <div
            className="border p-imdos-footer my-2 rounded"
            style={{ paddingTop: "13px !important" }}
          >
            <FiCalendar className="h4 m-0 text-white" />
          </div>
          <div
            className="border p-imdos-footer my-2 rounded"
            style={{ paddingTop: "13px !important" }}
          >
            <FiUser className="h4 m-0 text-white" />
          </div>
          <div
            className="border p-imdos-footer my-2 rounded"
            style={{ paddingTop: "13px !important" }}
            onClick={handleLogout}
          >
            <FiLogOut className="h4 m-0 text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
