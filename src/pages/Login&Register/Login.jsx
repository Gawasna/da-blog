import React, { useState } from "react";
import { login } from "./api.js";
import { Link, useNavigate } from "react-router-dom";
import { validate, IsNotEmpty, IsEmail } from "class-validator";
import Loading from "./Loading";
class LoginData {
  @IsNotEmpty({ message: "Please enter your email" })
  @IsEmail({}, { message: "Invalid email format" })
  email = "";

  @IsNotEmpty({ message: "Please enter your password" })
  password = "";
}

const Login = () => {
  const navigate = useNavigate();
  const [logindata, setLogindata] = useState(new LoginData());
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogindata({ ...logindata, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate input fields (client-side validation)
    const errors = await validate(logindata);
    if (errors.length > 0) {
      const errorMessages = errors.reduce((acc, error) => {
        acc[error.property] = Object.values(error.constraints).join(", ");
        return acc;
      }, {});
      setFormErrors(errorMessages);
      setIsLoading(false);
      return; // Không tiếp tục thực hiện đăng nhập nếu có lỗi từ validation
    }

    setFormErrors({}); // Reset lỗi form nếu không có lỗi validation

    try {
      // Call API để thực hiện đăng nhập
      await login(logindata);
      navigate("/congrat"); // Điều hướng đến trang sau khi đăng nhập thành công
    } catch (error) {
      // Nếu có lỗi từ server (ví dụ: tài khoản/mật khẩu sai), chỉ hiển thị lỗi chung ở đây
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        general: "Login failed. Please try again."
      }));
    } finally {
      setIsLoading(false); // Đảm bảo loading được tắt dù thành công hay lỗi
    }
  };

  return (
    <div className="lfbg">
      {isLoading && <Loading />} {/* Conditionally render Loading component */}
      <div className="frglw">
        <div className="login-container">
          <h2 className="tlt login">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={logindata.email}
                onChange={handleChange}
                className={formErrors.email ? "is-invalid" : ""}
              />
              {formErrors.email && (
                <div className="invalid-feedback">{formErrors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={logindata.password}
                onChange={handleChange}
                className={formErrors.password ? "is-invalid" : ""}
              />
              {formErrors.password && (
                <div className="invalid-feedback">{formErrors.password}</div>
              )}
            </div>

            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>

            {/* Hiển thị lỗi chung nếu có lỗi từ server */}
            {formErrors.general && (
              <div className="error">{formErrors.general}</div>
            )}

            <button className="button login is-white" type="submit">Login</button>
          </form>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
