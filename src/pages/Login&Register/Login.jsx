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
      return;
    }

    setFormErrors({});

    try {
      // Call API to login and get token
      const response = await login(logindata);
      
      if (response.token) {
        // Store the token in localStorage
        localStorage.setItem("token", response.token);

        // Update login state in a context or global state if needed
        // navigate to the main page or dashboard after login success
        navigate("/congrat");
      } else {
        // Handle case where response does not contain token
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          general: "Login failed. Invalid credentials."
        }));
      }
    } catch (error) {
      // Show error message based on response (if available)
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        general: error.response?.data?.message || "Login failed. Please try again."
      }));
    } finally {
      setIsLoading(false); // Ensure loading spinner is turned off
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
                placeholder="Enter your Email"
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
                placeholder="Enter your Password"
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

            <Link to="/forgotpassword" className="forgot-password-link">Forgot Password?</Link>

            {/* Display general error if server login fails */}
            {formErrors.general && (
              <div className="error">{formErrors.general}</div>
            )}

            <button className="button login is-white" type="submit">Login</button>
          </form>
          <label>Don't have an account?</label><Link to="/signup"> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
