import React from "react";
import Booking from "../../Components/AdminSide/Booking";
import Header from "../../Components/AdminSide/Header";
import Sidebar from "../../Components/AdminSide/Sidebar";

function BookingSlots() {
  return (
    <div class="d-flex bg-light" style={{height:'100%'}}>
      <div
        class="col-4 col-md-2 bg-secondary d-flex justify-content-center"
        style={{minHeight:'100vh' }}
      >
        <Sidebar />
      </div>
      <div class="col-8 col-md-10 bg-light" style={{ height: "100%"}}>
        <Header />
        <Booking/>
      </div>
    </div>
  );
}

export default BookingSlots;
