import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import $ from "jquery";
import { Steps } from "antd";
function UserHome() {
    const { Step } = Steps;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    button: false,
    applicationStatus: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    email: "",
    mobile: "",
    companyName: "",
    teamAndManagement: "",
    productsAndCompanyProfile: "",
    problem: "",
    uniqueSolution: "",
  });

  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUser({
        name: response.data.data.name,
        application: response.data.data.application,
        button: true,
        applicationStatus: response.data.data.applicationStatus,
      });
      console.log(response.data);
    } catch (err) {
      console.log("ERROR FOUND");
      console.log(err);
    }
  };

  //GET USER DATA
  useEffect(() => {
    getData();
  }, []);

  //USER LOGOUT
  function logOut() {
    localStorage.removeItem('token');
    navigate("/login");
    toast.success("Logged out");
  }

  //SET VALUES TO KEYS
  const changehandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //SUBMIT FORM
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      if (
        formData.address === "" ||
        formData.name === "" ||
        formData.city === "" ||
        formData.companyName === "" ||
        formData.email === "" ||
        formData.mobile === "" ||
        formData.problem === "" ||
        formData.productsAndCompanyProfile === "" ||
        formData.state === "" ||
        formData.teamAndManagement === "" ||
        formData.uniqueSolution === ""
      ) {
        toast.error("Every fields are required");
      } else {
        $("#exampleModal").hide();
        axios({
          method: "post",
          url: "/api/user/application",
          data: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          console.log("form submission success");
        });
        toast.success("Form submitted");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
   <Fragment>
      <div class="mt-4">
        <div class="col" style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "black" }}>Welcome &#160;</h2>
          <h2 class="text-info">{user.name}</h2>
          <h2> &#160; :)</h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "30px",
        }}
      >
        {user.button && !user.application && (
          <div class="">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              data-whatever="@mdo"
            >
              Apply form
            </button>
          </div>
        )}
        <div class="">
          <button onClick={logOut} type="button" class="btn btn-danger">
            Log out
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="col-10">

          { user.applicationStatus === 'Submitted' &&
            <Steps current={1} percent={60} labelPlacement="horizontal">
              <Step title="Submitted" />
              <Step title="In Progress" />
              <Step title="Approved" />
              <Step title="Slot confirmed" />
            </Steps>
          }
          { user.applicationStatus === 'Pending' &&
            <Steps current={2} percent={60} labelPlacement="horizontal">
              <Step title="Submitted" />
              <Step title="In Progress" />
              <Step title="Approved" />
              <Step title="Slot confirmed" />
            </Steps>
          }
          { user.applicationStatus ==='Approved' &&
            <Steps current={3} percent={60} labelPlacement="horizontal">
              <Step title="Submitted" />
              <Step title="In Progress" />
              <Step title="Approved" />
              <Step title="Slot confirmed" />
            </Steps>
          }
          { user.applicationStatus ==='Booked' &&
            <Steps current={4} status='success' percent={60} labelPlacement="horizontal">
              <Step title="Submitted" />
              <Step title="In Progress" />
              <Step title="Approved" />
              <Step title="Slot confirmed" />
            </Steps>
          }
          { user.applicationStatus ==='Cancelled' &&
            <Steps current={2} status="error" percent={60} labelPlacement="horizontal">
              <Step title="Submitted" />
              <Step title="In Progress" />
              <Step title="Cancelled" />
              <Step title="Cancelled" />
            </Steps>
          }
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Application form
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form
                onSubmit={submitForm}
                // id="submitForm"
              >
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Name:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Address:
                  </label>
                  <textarea
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="address"
                    name="address"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    City:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="city"
                    name="city"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    State:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="state"
                    name="state"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Email:
                  </label>
                  <input
                    onChange={changehandler}
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Mobile:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="mobile"
                    name="mobile"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Company name:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="companyName"
                    name="companyName"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Logo:
                  </label>
                  <input
                    onChange={changehandler}
                    type="file"
                    class="form-control"
                    id="logo"
                    name="logo"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Team and Background:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="teamAndManagement"
                    name="teamAndManagement"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Company and products:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="productsAndCompanyProfile"
                    name="productsAndCompanyProfile"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Problem:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="problem"
                    name="problem"
                  />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Solution:
                  </label>
                  <input
                    onChange={changehandler}
                    type="text"
                    class="form-control"
                    id="uniqueSolution"
                    name="uniqueSolution"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="" onClick={submitForm} class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
   </Fragment>
  )
}

export default UserHome