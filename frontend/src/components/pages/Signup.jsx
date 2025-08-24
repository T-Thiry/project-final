import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Mascot from '../../assets/images/Mascot.svg';

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

const Content = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

const LeftSection = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  h1 {
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    max-width: 400px;
    text-align: left;
    margin-left : auto;
    margin-right: auto;

    @media (min-width: 768px) {
    font-size: 2rem;
  }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(4)};
    max-width: 400px; 
    width: 100%; 
    margin: 0 auto; 
  }

  label {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }

  input {
    padding: ${({ theme }) => theme.spacing(2)};
    font-size: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.greyLight};
    border-radius: ${({ theme }) => theme.spacing(1)};
    width: 100%;
    box-sizing: border-box;
  }

  button {
    padding: ${({ theme }) => theme.spacing(2)};
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: ${({ theme }) => theme.spacing(2)};
    cursor: pointer;
    margin-top: ${({ theme }) => theme.spacing(4)};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.greyLight};
      cursor: not-allowed;
    }
  }

  .error-message {
    color: ${({ theme }) => theme.colors.error};
    font-size: 0.9rem;
    margin-top: ${({ theme }) => theme.spacing(2)};
  }

  p {
    margin-top: ${({ theme }) => theme.spacing(4)};
    font-size: 0.9rem;
    max-width: 400px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;

    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const RightSection = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none; /* Hide the RightSection on smaller screens */
  }
`;


const StarsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none; // Prevent interaction with stars
`;

const Star = styled(({ top, left, size, duration, ...rest }) => <div {...rest} />)`
position: absolute;
width: ${({ size }) => size}px;
height: ${({ size }) => size}px;
background-color: transparent;
clip-path: polygon(
  50% 0%,
  61% 35%,
  98% 35%,
  68% 57%,
  79% 91%,
  50% 70%,
  21% 91%,
  32% 57%,
  2% 35%,
  39% 35%
); // Creates a star shape
background-color: white;
animation: twinkle ${props => props.duration}s infinite ease-in-out; ease-in-out;
top: ${props => props.top}%;
left: ${props => props.left}%;

@keyframes twinkle {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const MascotImage = styled.img`
  width: 200px;
  height: auto;
  margin-top: ${({ theme }) => theme.spacing(6)};
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

      // Generate random stars
      const stars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 2, // Random size between 2px and 5px
        duration: Math.random() * 3 + 2, // Random animation duration between 2s and 5s
        top: Math.random() * 100, // Random position (top)
        left: Math.random() * 100, // Random position (left)
      }));

  return ( 
  <SignupContainer>
    <Navbar>
      <Logo>StoryBudget</Logo>
      <NavButtons>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </NavButtons>
    </Navbar>
    <Content>
      <LeftSection>
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
              autoComplete='name'
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
              autoComplete='email'
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
              autoComplete='new-password'
            />
            </div>
            <button type='submit' disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {error && <p className='error-message'>{error}</p>}
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
      </LeftSection>
      <RightSection>
      <StarsContainer>
        {stars.map((star) => (
          <Star
            key={star.id}
            size={star.size}
            duration={star.duration}
            top={star.top}
            left={star.left}
      />
        ))}
      </StarsContainer>
      <Heading>Welcome to StoryBudget</Heading>
      <Paragraph>Manage your budgets effortlessly and take control of your finances today!</Paragraph>
      <MascotImage src={Mascot} alt="StoryBudget Mascot" />
      </RightSection>
      </Content>
  </SignupContainer>
  );
};


export default Signup;
