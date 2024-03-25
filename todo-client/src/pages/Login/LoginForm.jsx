import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginStatus, setLoginStatus] = useState();
  const [statusMessage, setStatusMessage] = useState();

  useEffect(() => {
    console.log("res changed");
    if (loginStatus === 200) {
      console.log("res success");
      //logic for success
      setStatusMessage("User login successfully");
      navigate("/todo");
      return;
    }

    if (loginStatus === 401) {
      setStatusMessage("Login failed");
      return;
      //logic for failure
    }
    if (loginStatus) {
      setStatusMessage("Unknown error");
    }
    //catch all logic
  }, [loginStatus]);

  async function sendData(payload) {
    const url = "http://localhost:8080/login";
    const res = await fetch(url, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("Res :" + res.status);
    setLoginStatus(res.status);
  }

  const onSubmit = (data) => {
    sendData(data);
  };

  function showPassword(clicked) {
    const passwordInput = document.getElementById("password");

    if (clicked.target.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  return (
    <div className="container">
      <h2 className="title">Log in</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="loginform-input"
            type="email"
            placeholder="Enter your email here"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div style={{ color: "red" }}>*Email* is mandatory </div>
          )}
        </div>
        <div className="form-group">
          <input
            className="loginform-input"
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password here"
          />
          <div className="showpassword-box space">
            <input
              className="login-form-checkbox"
              type="checkbox"
              onClick={showPassword}
            />
            <span>Show password</span>
          </div>
        </div>
        <div>{statusMessage}</div>
        <div className="form-group">
          <input
            className="login-form-login"
            type={"submit"}
            value={"Log in"}
          />
        </div>
        <Link to="/register">
          <button className="login-form-no-account">I have no account</button>
        </Link>
      </form>
    </div>
  );
}
