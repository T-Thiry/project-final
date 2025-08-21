import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Mascot from '../../assets/images/Mascot.svg';

const LandingContainer = styled.div`
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyLight}; // Light grey border for navbar
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
    display: none; // Hide buttons on small screens
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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(8)}; // Push the content up
  margin-top: ${({ theme }) => theme.spacing(28)}; // Add space below the navbar
  z-index: 2; // Ensure content is above the falling star
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const LimeButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.limeGreen};
  color: ${({ theme }) => theme.colors.black};
`;

const MascotContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: calc(100vw / 2);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
`;

const MascotImage = styled.img`
  position: fixed;
  bottom: 25%; 
  left: 50%;
  transform: translate(-50%, 0) rotate(45deg);
  width: 180px; // Adjust mascot size
  height: auto;
  animation: float 12s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translate(-50%, 0) rotate(30deg) translateY(0); // Start position
    }
    25% {
      transform: translate(-50%, -5px) rotate(32deg) translateY(-5px); // Slight upward movement and rotation
    }
    50% {
      transform: translate(-50%, 0) rotate(30deg) translateY(0); // Float higher
    }
    75% {
      transform: translate(-50%, 5px) rotate(26deg) translateY(-5px); // Slight downward movement and rotation
    }
    100% {
      transform: translate(-50%, 0) rotate(30deg) translateY(0); // Return to start
    }
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
  z-index: 1; // Ensure stars are behind the content
`;

const Star = styled.div`
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
  animation: twinkle ${({ duration }) => duration}s infinite ease-in-out;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;

  @keyframes twinkle {
    0%, 100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }
`;

const Landing = () => {
  const navigate = useNavigate();

    // Generate random stars
    const stars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2, // Random size between 2px and 5px
      duration: Math.random() * 3 + 2, // Random animation duration between 2s and 5s
      top: Math.random() * 100, // Random position (top)
      left: Math.random() * 100, // Random position (left)
    }));

  return (
    <LandingContainer>
      <Navbar>
        <Logo>StoryBudget</Logo>
        <NavButtons>
          <Button 
          style={{ backgroundColor: 'inherit', color: 'white' }}
          onClick={() => navigate('/signup')}>Sign Up</Button>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </NavButtons>
      </Navbar>
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
      <Content>
        <Title>Welcome To StoryBudget</Title>
        <Text>Manage your budgets effortlessly.</Text>
        <LimeButton onClick={() => navigate('/signup')}>Get Started</LimeButton>
      </Content>
      <MascotContainer>
        <MascotImage src={Mascot} alt="StoryBudget Mascot" />
      </MascotContainer>
    </LandingContainer>
  )
};

export default Landing;
