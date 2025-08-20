import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call backend API to create user
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users/login`, {
        email,
        password
      });
      console.log(response.data);

      // Store the accessToken in localStorage
    localStorage.setItem('accessToken', response.data.response.accessToken);
    
        // Redirect to login page after successful login
        navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
      } finally {
      setLoading(false);
    }
  }

  return ( 
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
          <button type='submit' disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
          </button>
          {error && <p className='error-message'>{error}</p>}
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
};


export default Login;