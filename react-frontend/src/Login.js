import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      // Sending a POST request to FastAPI backend to get the JWT token
      const response = await axios.post(
        'http://localhost:8000/token', // Ensure the backend URL is correct
        new URLSearchParams({
          username: email, // FastAPI expects `username` for email in OAuth2PasswordRequestForm
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Extract the JWT token from the response
      const token = response.data.access_token;

      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem('token', token);

      // Redirect to the video stream page
      navigate('/stream');
    } catch (error) {
      // Handle errors like incorrect credentials
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;