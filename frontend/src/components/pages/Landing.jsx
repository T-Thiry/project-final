import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Landing = () => {
  const navigate = useNavigate();

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
      <Content>
        <Title>Welcome To StoryBudget</Title>
        <Text>Manage your budgets effortlessly.</Text>
        <LimeButton onClick={() => navigate('/signup')}>Get Started</LimeButton>
      </Content>
    </LandingContainer>
  )
};

export default Landing;
