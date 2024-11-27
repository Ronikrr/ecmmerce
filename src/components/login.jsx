import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import { fetchData } from './apiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();  // Try to get the error response body (if any)
        console.log('API Error Response:', response.status, errorData);
        throw new Error('Login failed. Please check your credentials.');
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Failed to parse server response.');
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      const userData = await fetchData('YOUR_USER_DATA_ENDPOINT');
      console.log('User data:', userData);

      navigate('/account');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <div className="form-group my-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <div className="form-group text-center my-3">

            <label htmlFor="" className='text-center' >if you not registered  <Link to='/register'>register </Link> </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
