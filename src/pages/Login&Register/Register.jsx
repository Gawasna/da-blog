import React, { useState } from "react";
import "./login.css";
import { login } from "./api.js";
import { Link, useNavigate  } from "react-router-dom";
import { IsEmail, IsNotEmpty } from "class-validator";

class LoginData {
  @IsNotEmpty({ message: "Please enter your email" })
  @IsEmail({}, { message: "Invalid email format" })
  email = "";

  @IsNotEmpty({ message: "Please enter your password" })
  password = "";
}

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="lfbg">
      <div className="frglw">
      <div className="login-container">
        <h2 className="tlt login">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="Enter your Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              placeholder="Enter your Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="button login is-white" type="submit">Login</button>
        </form>
        <label>Already have an account?</label><Link to="/Login"> Login</Link>
      </div>
      </div>
    </div>
  );
};

export default Register;
