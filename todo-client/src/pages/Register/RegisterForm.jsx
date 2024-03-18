import "./Register.css";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  function showPassword(clicked) {
    const passwordInput = document.getElementById("password");

    if (clicked.target.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  function showPassword2(clicked) {
    const password2Input = document.getElementById("password2");

    if (clicked.target.checked) {
      password2Input.type = "text";
    } else {
      password2Input.type = "password";
    }
  }

  const password = watch("password", "");
  const password2 = watch("password2", "");

  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Register a new account</h2>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-form-group">
          <input
            className="register-form-input"
            type="name"
            placeholder="Enter name"
            {...register("name", { required: true })}
          />
          {errors.email && <div style={{ color: "red" }}>*Name* is mandatory </div>}
        </div>

        <div className="register-form-group">
          <input
            className="register-form-input"
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.email && <div style={{ color: "red" }}>*Email* is mandatory </div>}
        </div>
        <div className="form-group">
          <input
            className="register-form-input"
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter password"
          />
          <div className="register-form-show-password-box">
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
            id="password2"
            type="password"
            {...register("password2")}
            placeholder="Enter password again"
          />
          <div className="register-form-show-password-box">
            <input
              type="checkbox"
              className="register-form-checkbox"
              onClick={showPassword2}
            />
            <span className="register-form-p">Show password</span>
          </div>
        </div>

        {password !== password2 && password2.length > 0 && (
          <p className="register-form-password-no-match" style={{ color: "red" }}>
            Passwords do not match!
          </p>
        )}

        <div className="register-form-group">
          <input
            className="register-form-submit-button"
            type={"submit"}
            value={"Create account"}
          />
        </div>
      </form>
    </div>
  );
}
