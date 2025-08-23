import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignupContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white}; 
  font-family: ${({ theme }) => theme.typography.fontFamily}; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyLight};
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;

const NavButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};

  @media (max-width: 767px) {
    display: none;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  font-size: ${({ theme }) => theme.typography.fontSize};
  border: none;
  border-radius: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.limeGreenLight};
  }
`;


const Signup = () => {
  const [name, setName] = useState('');
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
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users/signup`, {
        name,
        email,
        password
      });
      console.log(response.data);

      // Store the accessToken in localStorage
    localStorage.setItem('accessToken', response.data.response.accessToken);
    
        // Redirect to login page after successful signup
        navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      } finally {
      setLoading(false);
    }
  }

  return ( 
  <SignupContainer>
    <Navbar>
      <Logo>StoryBudget</Logo>
      <NavButtons>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </NavButtons>
    </Navbar>
      <div className='signup-container'>
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {error && <p className='error-message'>{error}</p>}
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
  </SignupContainer>
  );
};


export default Signup;
