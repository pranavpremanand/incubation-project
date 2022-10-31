import React from "react";
import { Form, Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/AlertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className="background">
      <div className="authentication">
        <div className="authentication-form card p-3 col-8">
          <h1 className="card-title">Login</h1>
          <Form layout="vertical" onFinish={onFinish}>

            <Form.Item label="Email" name="email">
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>

            <Button className="primary-button mt-3 mb-3" htmlType="submit">
              LOGIN
            </Button>
          </Form>

          <Link to="/signup" className="anchor">
            Click here to Signup
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Login;
