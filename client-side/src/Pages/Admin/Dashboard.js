import React from "react";
import Header from "../../Components/AdminSide/Header";
import Sidebar from "../../Components/AdminSide/Sidebar";
import ApplicationList from "../../Components/AdminSide/ApplicationList";

function Home() {
  return (
    <div class="d-flex bg-light">
    <div
      class="col-4 col-md-2 bg-secondary d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <Sidebar />
    </div>
    <div class="col-8 col-md-10 bg-light" style={{ height: "100vh" }}><Header/>
    <ApplicationList/>
    </div>
  </div>
  );
}

export default Home;
