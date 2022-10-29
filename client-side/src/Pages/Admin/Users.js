import React from 'react'
import Header from '../../Components/AdminSide/Header';
import Sidebar from "../../Components/AdminSide/Sidebar";
import UsersList from '../../Components/AdminSide/UsersList';

function Users() {
  return (
    <div class="d-flex bg-light">
    <div
      class="col-4 col-md-2 bg-secondary d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <Sidebar />
    </div>
    <div class="col-8 col-md-10 bg-light" style={{ height: "100vh" }}>
        <Header/>
        <UsersList/>
    </div>
  </div>
  )
}

export default Users