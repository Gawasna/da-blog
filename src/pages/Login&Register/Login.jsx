import React, { useState, useContext, useEffect } from "react";
import { login } from "./api.js";
import { Link, useNavigate } from "react-router-dom";
import { validate, IsNotEmpty, IsEmail } from "class-validator";
import { Form, Input, Button, message as antMessage } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { AuthContext } from "@/component/layout/header/AuthContext";

class LoginData {
  @IsNotEmpty({ message: "Please enter your email" })
  @IsEmail({}, { message: "Invalid email format" })
  email = "";
  @IsNotEmpty({ message: "Please enter your password" })
  password = "";
}

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logindata, setLogindata] = useState(new LoginData());
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Cập nhật bộ đếm ngược mỗi giây
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer); // Dừng bộ đếm khi hết thời gian
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Hiển thị thông báo khi bộ đếm ngược thay đổi
  // useEffect(() => {
  //   if (countdown > 0) {
  //     antMessage.destroy();  // Xóa thông báo cũ để tránh trùng lặp
  //     antMessage.warning(`Please wait ${countdown} seconds before trying again.`);
  //   }
  // }, [countdown]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogindata({ ...logindata, [name]: value });
  };

  const handleLogin = async (values) => {
    if (countdown > 0) {
      antMessage.error(`Please wait ${countdown} seconds before trying again.`);
      return;
    }
    setIsLoading(true);
    const errors = await validate(logindata);
    if (errors.length > 0) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints).join(", ")
      );
      antMessage.warning(errorMessages.join(" | "));
      setIsLoading(false);
      return;
    }
    try {
      const response = await login(logindata);
      antMessage.success("Login successful! Redirecting...");
      localStorage.setItem("access_token", response.access_Token);
      localStorage.setItem("refresh_token", response.refresh_Token);
      localStorage.setItem("user_id", response.user_id);
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setCountdown(60);  // Đặt lại bộ đếm khi bị giới hạn
        antMessage.error("Too many login attempts. Please wait 60 seconds before trying again.");
      } else if (error.response) {
        const HTTPerror = error.response.statusText + " " + error.response.status;
        const errorMessage = error.response.data.message;
        antMessage.error(HTTPerror || errorMessage);
        console.log(HTTPerror);
      } else {
        antMessage.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundImage: `url("https://images8.alphacoders.com/138/1382594.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 8,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            validateStatus={logindata.email ? "" : "error"}
            help={!logindata.email && "Please enter your email"}
          >
            <Input
              name="email"
              placeholder="Enter your Email"
              value={logindata.email}
              onChange={handleChange}
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={logindata.password ? "" : "error"}
            help={!logindata.password && "Please enter your password"}
          >
            <Input.Password
              name="password"
              placeholder="Enter your Password"
              value={logindata.password}
              onChange={handleChange}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          Don't have an account? <Link to="/signup">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;