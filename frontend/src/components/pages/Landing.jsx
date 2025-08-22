import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Mascot from '../../assets/images/Mascot.svg';

const LandingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden; /* Ensure stars don't overflow */
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
  z-index: 3;
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
  background-color: ${({ theme, variant }) => variant === 'transparent' ? 'inherit' : theme.colors.pink};
  color: ${({ theme, variant }) =>
    variant === 'transparent' ? theme.colors.white : theme.colors.black};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  font-size: ${({ theme }) => theme.typography.fontSize};
  border: none;
  border-radius: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.limeGreenLight};
  }
`;

const StarsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // Prevent interaction with stars
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

const FallingStar = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 8px white, 0 0 16px white, 0 0 24px white; // Glow effect
  animation: fall 14s infinite ease-in-out;
  top: -10%;
  left: -10%;
  z-index: 0; // Ensure falling star is behind the content

  &::after {
    content: '';
    position: absolute;
    height: 2px; // Thickness of the tail
    background: linear-gradient(90deg, rgba(151, 151, 151, 0.8), rgba(255, 255, 255, 0)); // Fading tail effect
    top: 50%;
    left: -60px; // Position the tail behind the star
    transform: translateY(-50%);
    border-radius: 50px; // Curve the tail
  }

  @keyframes fall {
    0% {
      transform: translate(0vw, -10vh) rotate(45deg);
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      transform: translate(90vw, 120vh) rotate(45deg);
      opacity: 0;
    }
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  margin-bottom: ${({ theme }) => theme.spacing(4)};

   @media (min-width: 768px) {
    font-size: 2.5rem;
  }
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.limeGreenLight};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 2; // Ensure content is above stars
  `;

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(8)};

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing(12)};
  }
`;

const MascotSection = styled(Section)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MascotImage = styled.img`
  width: 180px; // Adjust mascot size
  height: auto;
  animation: float 12s ease-in-out infinite;

  @keyframes float {
    0%, 50%, 100%{
      transform:  translateY(0); // Start position
    }
    25%, 75% {
      transform:  translateY(-10px); // Slight upward movement and rotation
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
          <Button variant="transparent" onClick={() => navigate('/signup')}>Sign Up</Button>
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
        <FallingStar /> {/* Single falling star */}
      </StarsContainer>
      <ContentContainer>
        <Section>
          <Title>Welcome To StoryBudget</Title>
          <Text>Your Finances, Your Story, Your Control.</Text>
          <LimeButton onClick={() => navigate('/signup')}>Get Started</LimeButton>
        </Section>
        <MascotSection>
          <MascotImage src={Mascot} alt="StoryBudget Mascot" />
        </MascotSection>
      </ContentContainer>
    </LandingContainer>
  )
};

export default Landing;
