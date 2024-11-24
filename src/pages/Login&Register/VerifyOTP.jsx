import React, { useState } from 'react';
import { Form, Input, Button, message as antMessage } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtpAndResetPassword } from '@/pages/Login&Register/api';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (e) => setOtp(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleRetypePasswordChange = (e) => setRetypePassword(e.target.value);

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      if (newPassword !== retypePassword) {
        antMessage.error('Passwords do not match');
        setIsLoading(false);
        return;
      }
      await verifyOtpAndResetPassword(email, otp, newPassword);
      console.log(email, otp, newPassword);
      antMessage.success('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      antMessage.error('Failed to reset password. Please try again.');
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
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Xác minh OTP</h2>
        <Form layout="vertical" onFinish={handleVerifyOtp}>
          <Form.Item
            label="OTP"
            validateStatus={otp ? '' : 'error'}
            help={!otp && 'Please enter the OTP'}
          >
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            validateStatus={newPassword ? '' : 'error'}
            help={!newPassword && 'Please enter your new password'}
          >
            <Input.Password
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Retype New Password"
            validateStatus={retypePassword ? '' : 'error'}
            help={!retypePassword && 'Please retype your new password'}
          >
            <Input.Password
              placeholder="Retype new password"
              value={retypePassword}
              onChange={handleRetypePasswordChange}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOTP;