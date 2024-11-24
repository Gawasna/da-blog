import React, { useState } from 'react';
import { Form, Input, Button, message as antMessage } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { requestOtp } from '@/pages/Login&Register/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      await requestOtp(email);
      antMessage.success('Password reset link sent to your email!');
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      antMessage.error('Failed to send password reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        background: '#f0f2f5',
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Forgot Password</h2>
        <Form layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            label="Email"
            validateStatus={email ? '' : 'error'}
            help={!email && 'Please enter your email'}
          >
            <Input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;