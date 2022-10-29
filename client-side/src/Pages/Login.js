import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/AlertsSlice";

function Login() {
  const dispatch = useDispatch();
  // const {loading} = useSelector(state => state.alerts);
  // console.log("loading",loading);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      // console.log('heyy')
      if (response.data.success) {
        // console.log('hello')
        toast.success(response.data.message);
        // toast('Redirecting to home page')
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
        <div className="authentication-form card p-3">
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
