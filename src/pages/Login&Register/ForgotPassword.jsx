import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(''); 
  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log(email); 
    setMessage('If your email is registered, you will receive a password reset link.'); };

  return (
    <div className="lfbg">
      <div className="frglw">
      <div className="login-container">
        <h2 className="tlt login">Reset Password</h2>
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
            <label>Verify code</label>
            <input
              placeholder="Enter your Verify code"
              type="code"
            />
            <label>New password</label>
            <input
              placeholder="Enter your new password"
              type="password"
            />
            <label>Confirm password</label>
            <input
              placeholder="Enter your new password"
              type="password"
            />
          </div>
          <button className="button login is-white" type="submit">Confirm</button>
        </form>
        <label>Remember your password?</label><Link to="/Login"> Login</Link>
        <div><label>Don't have an account?</label><Link to="/signup"> Register</Link></div>
      </div>
      </div>
    </div>
  );
};

export default Register;
