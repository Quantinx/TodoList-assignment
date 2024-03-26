import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { TaskProviderContext } from "../../provider/TaskProvider";

export default function LoginForm() {
  const { setLoggedIn } = useContext(TaskProviderContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginStatus, setLoginStatus] = useState();
  const [statusMessage, setStatusMessage] = useState();

  useEffect(() => {
    if (loginStatus === 200) {
      setStatusMessage("User login successfully");
      setLoggedIn(true);
      navigate("/todo");
      return;
    }

    if (loginStatus === 401) {
      setStatusMessage("Login failed");
      return;
    }
    if (loginStatus) {
      setStatusMessage("Unknown error");
    }
  }, [loginStatus]);

  useEffect(() => {
    async function checkToken() {
      const url = "http://localhost:8080/session";
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setLoggedIn(true);
        navigate("/todo");
      }
    }
    checkToken();
  }, []);

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
            <input className="" type="checkbox" onClick={showPassword} />
            <div>Show password</div>
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
