import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiBarChart2, FiCreditCard, FiTrendingUp, FiEdit } from 'react-icons/fi';
import { FaCoins } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme } from '../../styles/theme';
import VariableExpenses from './VariableExpenses';
import FixedExpenses from './FixedExpenses';

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
  }

  @media (max-width: 767px) {
  display: none; // Hide left panel on mobile
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
  gap: ${({ theme }) => theme.spacing(2)};
  grid-template-columns: 40% 60%; // Default to one column

  @media (max-width: 1023px) {
    grid-template-columns: 1fr; // Two columns on tablet
  }
`;

const Section = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
     font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  }

  &.chart-section {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  &.chart-section h3 {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
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
  background-color: ${({ $bgColor, theme }) => $bgColor || theme.colors.greyLight}; 
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }

  p {
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightSemiBold};
    margin: 0;
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
  const [income, setIncome] = useState(0);
  const [totalSpendings, setTotalSpendings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    navigate('/'); 
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchIncome();
      await fetchTotalSpendings();
      setLoading(false);
    };

    fetchData();
  }, []);


  const fetchIncome = async () => {
    try {
      const response = await fetch('http://localhost:8080/income');
      if (!response.ok) {
        throw new Error('Failed to fetch income');
      }
      const data = await response.json();
      setIncome(data.income);
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

    const fetchTotalSpendings = async () => {
      try {
        const response = await fetch('http://localhost:8080/spendings/total'); 
        if (!response.ok) {
          throw new Error('Failed to fetch total spendings');
        }
        const data = await response.json();
        setTotalSpendings(data.total);
      } catch (error) {
        console.error('Error fetching total spendings:', error);
      }
    };

    useEffect(() => {
      const fetchChartData = async () => {
        try {
          const response = await fetch('http://localhost:8080/income/months');
          if (!response.ok) {
            throw new Error('Failed to fetch months data');
          }
          const monthsData = await response.json();
          const data = monthsData.map((monthData) => ({
            name: monthData.month,
            Income: monthData.amount || 0,
            Spendings: totalSpendings, // Use totalSpendings state
          }));
      setChartData(data);
      } catch (error) {
        console.error('Error fetching months data:', error);
      }
    };  
    fetchChartData();
  }, [totalSpendings]); // Re-fetch chart data when totalSpendings changes
      
      

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
              <Card $bgColor={theme.colors.limeGreenExtraLight}>
              <span className="edit-icon">
                <FiEdit />
              </span>
                <h4>Balance</h4>
                <p>SEK 0</p>
                <span>Additional Info</span>
              </Card>
              <Card $bgColor={theme.colors.greyLight}>
              <span className="edit-icon" onClick={() => navigate('/spendings-management')} >
                <FiEdit />
              </span>
                <h4>Spendings</h4>
                <p>SEK {loading ? 'Loading...' : totalSpendings}</p>
                <span>Additional Info</span>
              </Card>
              <Card $bgColor={theme.colors.pinkLight}>
              <span className="edit-icon">
                <FiEdit />
              </span>
                <h4>Savings</h4>
                <p>SEK 0</p>
                <span>Additional Info</span>
              </Card>
              <Card $bgColor={theme.colors.limeGreenLight}>
              <span className="edit-icon" onClick={() => navigate('/income-management')} >
                <FiEdit />
              </span>
                <h4>Income</h4>
                {loading ? null : <p>SEK {income}</p>}
                <span>Additional Info</span>
              </Card>
            </CardContainer>
          </Section>
          <Section className='chart-section'>
            <h3>Balance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis dataKey="name"
                tick={{
                  fill: theme.colors.greyLight, // Lighter gray color for the text
                }} 
                />
                <YAxis
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `${(value / 1000).toFixed(1)}K`; // Format numbers as "K"
                    }
                    return value;
                  }}
                  tick={{
                    fill: theme.colors.greyLight, // Lighter gray color for the text
                  }}
                />
                <Tooltip
                  formatter={(value) => {
                    if (value >= 1000) {
                      return `${(value / 1000).toFixed(1)}K`; // Format tooltip numbers as "K"
                    }
                    return value;
                  }}
                />
                <Legend
                  align="left" 
                  wrapperStyle={{ marginLeft: '65px' }}
                />
                <Bar dataKey="Income" fill={theme.colors.limeGreen} />
                <Bar dataKey="Spendings" fill={theme.colors.pinkLight} />
              </BarChart>
            </ResponsiveContainer>
          </Section>
          <Section>
            <h3>Variable Expenses</h3>
            <VariableExpenses />
          </Section>
          <Section>
            <h3>Fixed Expenses</h3>
            <FixedExpenses />
          </Section>
        </RightContent>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;