import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute(props) {
  if (localStorage.getItem("admin-token")) {
    return <Navigate to={"/admin/home"} />;
  } else {
    return props.children;
  }
}

export default AdminRoute;
