import React from "react";
import { Form, Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/AlertsSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      if (!values.email || !values.password || !values.name || !values.phone) {
        toast.error("All fields are required.");
      } else {
        dispatch(showLoading);
        const response = await axios.post("/api/user/signup", values);
        dispatch(hideLoading);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      dispatch(hideLoading);
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className="background">
      <div className="authentication">
        <div className="authentication-form card p-3 col-8">
          <h1 className="card-title">Signup</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" type="text" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item label="Phone number" name="phone">
              <Input placeholder="Phone number" type="tel" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>

            {/* <Form.Item label="Confirm password" name="re-password">
              <Input placeholder="Confirm Password" />
            </Form.Item> */}

            <Button className="primary-button mt-3 mb-3" htmlType="submit">
              SIGNUP
            </Button>
          </Form>

          <Link to="/login" className="anchor">
            Click here to Login
          </Link>

          {/* <ul
            class="nav nav-pills nav-justified mb-3 mt-3"
            id="ex1"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="tab-login"
                data-mdb-toggle="pill"
                href="#pills-login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                Login
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="tab-register"
                data-mdb-toggle="pill"
                href="#pills-register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
              >
                Register
              </a>
            </li>
          </ul> */}

          {/* <div className="authentication-form p-2" style={{ height: "80%" }}>
            <div class="tab-content ">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
              >
               
                <form>
                  <div class="mb-3">
                    <h3 class="text-center">Login</h3>
                  </div>
              
                  <div class="mb-4">
                    <input
                      type="email"
                      id="loginName"
                      class="form-control"
                      placeholder="Email"
                      style={{ width: "300px" }}
                    />
                   
                  </div>

                  <div class="mb-4">
                    <input
                      type="password"
                      id="loginPassword"
                      class="form-control"
                      placeholder="Password"
                    />
                   
                  </div>

                  <button type="submit" class="btn btn-danger btn-block mb-4">
                    Login
                  </button>
                </form>
              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="tab-register"
              >
                <form onSubmit={addUser}>
                  <div class="mb-3">
                    <h3 class="text-center">Signup</h3>
                  </div>
                  <div class="mb-4">
                    <input
                      type="text"
                      id="loginPassword"
                      class="form-control"
                      placeholder="Username"
                      style={{ width: "300px" }}
                    />
                    
                  </div>
             
                  <div class="mb-4">
                    <input
                      type="email"
                      id="loginName"
                      class="form-control"
                      placeholder="Email"
                    />
                   
                  </div>

                  <div class="mb-4">
                    <input
                      type="tel"
                      id="loginPassword"
                      class="form-control"
                      placeholder="Phone number"
                    />
                   
                  </div>
                 
                  <div class="mb-4">
                    <input
                      type="password"
                      id="loginPassword"
                      class="form-control"
                      placeholder="Password"
                    />
                    
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      id="loginPassword"
                      class="form-control"
                      placeholder="Re-enter password"
                    />
                   
                  </div>

                
                  <button type="submit" class="btn btn-danger btn-block mb-4">
                    Register
                  </button>

                 
                </form>
              </div>
            </div>
            
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
