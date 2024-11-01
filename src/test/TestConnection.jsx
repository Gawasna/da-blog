import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestConnection = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/test')
      .then(response => {
        console.log("Response from server: ", response);
        setMessage(response.data);
      })
      .catch(error => {
        setMessage('Connection failed');
        console.error("Error connecting to backend: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Test Connection</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestConnection;