import "./Register.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerStatus, setRegisterStatus] = useState();
  const [statusMessage, setStatusMessage] = useState();

  useEffect(() => {
    if (registerStatus === 201) {
      setStatusMessage("User created successfully");
      navigate("/login");
      return;
    }

    if (registerStatus === 500) {
      setStatusMessage("User with this email already exists");
      return;
    }
    if (registerStatus) {
      setStatusMessage("Unknown error");
    }
  }, [registerStatus]);

  async function sendData(payload) {
    const url = "http://localhost:8080/register";
    const res = await fetch(url, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    setRegisterStatus(res.status);
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
    <div className="register-form-container">
      <h2 className="register-form-title">
        Register
        <br />a new account
      </h2>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-form-group">
          <input
            className="register-form-input"
            type="text"
            placeholder="Enter name"
            {...register("username", { required: true })}
          />
          {errors.email && (
            <div style={{ color: "red" }}>*Name* is mandatory </div>
          )}
        </div>

        <div className="register-form-group">
          <input
            className="register-form-input"
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <div style={{ color: "red" }}>*Email* is mandatory </div>
          )}
        </div>
        <div className="form-group">
          <input
            className="register-form-input"
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter password"
          />
          <div className="register-form-show-password-box space">
            <input
              type="checkbox"
              className="register-form-checkbox"
              onClick={showPassword}
            />
            <span className="register-form-p">Show password</span>
          </div>
        </div>
        <div className="register-form-group">
          <input
            className="register-form-submit-button"
            type={"submit"}
            value={"Create account"}
          />
        </div>
        <div>{statusMessage}</div>
        <Link to="/login">
          <button className="register-form-have-an-account">
            I have an account
          </button>
        </Link>
      </form>
    </div>
  );
}
