import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./login.css";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // const userData = JSON.parse(localStorage.getItem(data.email));
    // if (userData) {
    //   // getItem can return actual value or null
    //   if (userData.password === data.password) {
    //     console.log(userData.name + " You Are Successfully Logged In");
    //   } else {
    //     console.log("Email or Password is not matching with our record");
    //   }
    // } else {
    //   console.log("Email or Password is not matching with our record");
    // }
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
