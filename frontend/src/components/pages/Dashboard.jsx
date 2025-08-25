import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiBarChart2, FiCreditCard, FiTrendingUp, FiEdit } from 'react-icons/fi';
import { FaCoins } from 'react-icons/fa';

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

const DashboardContainer = styled.div`
  display: flex;
  height: calc(100vh - ${({ theme }) => theme.spacing(8)}); // Full height minus navbar height
`;

const LeftPanel = styled.div`
  width: 190px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};

  h2 {
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const TabButton = styled.button`
  background-color: ${({ theme }) => theme.colors.greyLight};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spacing(3)};
  font-size: 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const RightContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(4)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  grid-template-columns: repeat(1, 1fr); // Default to one column
  grid-auto-rows: 1fr; // Ensure all rows have equal height

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // Two columns on tablet
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // Two columns on desktop
  }
`;

const Section = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  grid-template-columns: repeat(1, 1fr); // Default to one column

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // Two columns on tablet
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // Two columns on desktop
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight}; 
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 1.25rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  p {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

   .edit-icon {
    position: absolute;
    top: ${({ theme }) => theme.spacing(2)};
    right: ${({ theme }) => theme.spacing(2)};
    cursor: pointer;
    font-size: 1rem; // Adjust the size of the emoji
  }
`;


const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Example: Clear the access token
    navigate('/'); // Redirect to the landing page
  };

  return (
    <>
      <Navbar>
        <Logo>StoryBudget</Logo>
        <NavButtons>
          <Button onClick={handleLogout}>Logout</Button>
        </NavButtons>
      </Navbar>
      <DashboardContainer>
        <LeftPanel>
          <h2>Dashboard</h2>
          <TabButton>
            <FiBarChart2 size={20} style={{ marginRight: '8px' }} /> Balance
          </TabButton>
          <TabButton>
            <FiCreditCard size={20} style={{ marginRight: '8px' }} /> Spendings
          </TabButton>
          <TabButton>
            <FaCoins size={20} style={{ marginRight: '8px' }} /> Savings
          </TabButton>
          <TabButton>
            <FiTrendingUp size={20} style={{ marginRight: '8px' }} /> Income
          </TabButton>
        </LeftPanel>
        <RightContent>
          <Section>
          <CardContainer>
              <Card>
              <span className="edit-icon">
                <FiEdit />
              </span>
                <h4>Balance</h4>
                <p>SEK 0</p>
                <span>Additional Info</span>
              </Card>
              <Card>
              <span className="edit-icon">
                <FiEdit />
              </span>
                <h4>Spendings</h4>
                <p>SEK 0</p>
                <span>Additional Info</span>
              </Card>
              <Card>
              <span className="edit-icon">
                <FiEdit />
              </span>
                <h4>Savings</h4>
                <p>SEK 0</p>
                <span>Additional Info</span>
              </Card>
              <Card>
              <span className="edit-icon" onClick={() => navigate('/income-management')} >
                <FiEdit />
              </span>
                <h4>Income</h4>
                <p>SEK 0</p>
                <span>Additional Info</span>
              </Card>
            </CardContainer>
          </Section>
          <Section>
            <h3>Section 2</h3>
            <p>Content for section 2.</p>
          </Section>
          <Section>
            <h3>Section 3</h3>
            <p>Content for section 3.</p>
          </Section>
          <Section>
            <h3>Section 4</h3>
            <p>Content for section 4.</p>
          </Section>
        </RightContent>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;