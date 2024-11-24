import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IsEmail, IsNotEmpty } from "class-validator";
import "./login.css";

class LoginData {
  @IsNotEmpty({ message: "Please enter your email" })
  @IsEmail({}, { message: "Invalid email format" })
  email = "";

  @IsNotEmpty({ message: "Please enter your password" })
  password = "";
}

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      // Simulating a successful registration (replace with API logic)
      console.log("Form Values:", values);

      message.success("Registration successful! Redirecting to Login...");
      navigate("/login");
    } catch (error) {
      // Simulate an error scenario
      message.error(error.message || "Registration failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidationFailed = (errorInfo) => {
    // Display popup for form validation errors
    message.warning("Please fix the validation errors before submitting!");
  };

  return (
    <div className="lfbg">
      <div className="frglw">
        <div className="login-container">
          <Title level={2} className="tlt login">
            Register
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={handleValidationFailed}
            autoComplete="off"
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
                {
                  type: "email",
                  message: "Invalid email format!",
                },
              ]}
            >
              <Input placeholder="Enter your Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters!",
                },
              ]}
            >
              <Input.Password placeholder="Enter your Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <Text>
            Already have an account? <Link to="/login">Login</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Register;
