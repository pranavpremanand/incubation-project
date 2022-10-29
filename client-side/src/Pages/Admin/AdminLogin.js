import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/AlertsSlice";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      axios({
        url:'/admin',
        method:'post',
        data:values
      }).then(response=>{
        dispatch(hideLoading());
        toast.success(response.data.message);
        localStorage.setItem("admin-token", response.data.data);
        navigate("/admin/home");
      }).catch(err=>{
        dispatch(hideLoading())
        toast.error('Something went wrong.');
      })
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className="background">
      <div className="authentication">
        <div className="authentication-form card p-3">
          <h1 className="card-title">Admin Login</h1>
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

          {/* <Link to="/signup" className="anchor">
            Click here to Signup
          </Link> */}

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;