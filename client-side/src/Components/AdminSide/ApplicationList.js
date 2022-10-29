import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/AlertsSlice";

function ApplicationList() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  //Get applications list
  const getData = () => {
    dispatch(showLoading());
    axios({
      url: "/admin/get-applications-list",
      method: "post",
    }).then((response) => {
      dispatch(hideLoading());
      setData(response.data.data);
    }).catch(err=>{
      dispatch(hideLoading());
    })
  };

  //Change status to Pending
  const changeStatus = (id) => {
    dispatch(showLoading());
    axios({
      url: "/admin/change-status/" + id,
      method: "get",
    })
      .then((response) => {
        dispatch(hideLoading());
        getData();
        toast.success(response.data.response.message);
      })
      .catch((err) => {
        dispatch(hideLoading());
        toast.error("Something went wrong");
      });
  };

  //Cancel application
  const denyApplication = (id) => {
    dispatch(showLoading());
    axios({
      url: "/admin/deny-application/" + id,
      method: "get",
    })
      .then((response) => {
        dispatch(hideLoading());
        getData();
        toast.success("Application cancelled");
      })
      .catch((err) => {
        dispatch(hideLoading());
        toast.error("Something went wrong");
      });
  };
  return (
    <Fragment>
      <hr></hr>
      <h3 class="text-center">New Applications</h3>
      <div class="mb-5 table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Company name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {//   !data.length === 0 ? (
            data.map((val, index) => {
              return (
                val.status === "Submitted" && (
                  <tr>
                    <td class="col">{val.date}</td>
                    <td class="col">{val.name}</td>
                    <td class="col">{val.email}</td>
                    <td class="col">{val.mobile}</td>
                    <td class="col">{val.companyName}</td>
                    <td class="col">
                      <button
                        onClick={() => changeStatus(val.userId)}
                        class="btn btn-warning"
                      >
                        Add to pending list
                      </button>
                    </td>
                  </tr>
                )
              );
            })
            //   ) : (
            //     <h5>No new applications</h5>
            //   )
            }
          </tbody>
        </table>
      </div>
      <hr></hr>
      <div class="table-responsive">
        <h3 class="text-center">Pending Applications</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Company name</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                val.status === "Pending" && (
                  <tr>
                    <td class="col">{val.date}</td>
                    <td class="col">{val.name}</td>
                    <td class="col">{val.email}</td>
                    <td class="col">{val.mobile}</td>
                    <td class="col">{val.companyName}</td>
                    <td class="col">
                      <button
                        onClick={() => changeStatus(val.userId)}
                        class="btn btn-success"
                      >
                        Approve
                      </button>
                    </td>
                    <td class="col">
                      <button
                        onClick={() => denyApplication(val.userId)}
                        class="btn btn-danger"
                      >
                        Deny
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ApplicationList;
