import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import toast from "react-hot-toast";

function SideBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("admin-token");
    toast.success("Logged out");
    navigate("/admin");
  };
  return (
    <Fragment>
      <div class="mt-5">
        <h4 class="col text-light fw-bold">
          <u>ADMIN</u>
        </h4>
        <h6 class="col mb-3" onClick={() => navigate("/admin/home")}>
          Applications
        </h6>
        <h6 class="col mb-3" onClick={() => navigate("/admin/users")}>
          Users
        </h6>
        <h6 class="col mb-3" onClick={() => navigate("/admin/booking-slots")}>
          Book slots
        </h6>
        <h6 class="col" onClick={logout}>
          Logout
        </h6>
      </div>
    </Fragment>
  );
}

export default SideBar;
