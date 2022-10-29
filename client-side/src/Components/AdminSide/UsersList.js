import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/AlertsSlice";

function UsersList() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  useEffect(() => {
    dispatch(showLoading())
    axios({
      method: "get",
      url: "/admin/get-users",
    }).then((response) => {
      dispatch(hideLoading())
      setUsers(response.data.data);
    });
  }, []);

  return (
    <Fragment>
      <h3 class="text-start">Users</h3>
      <div class='table-responsive'>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No:</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </Fragment>
  );
}

export default UsersList;
