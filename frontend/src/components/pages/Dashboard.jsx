import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VariableExpenses from './VariableExpenses';
import FixedExpenses from './FixedExpenses';
import DashboardCards from './DashboardCards';
import DashboardChart from './DashboardChart';
import LeftPanel from './LeftPanel';
import Navbar from './Navbar';

const DashboardContainer = styled.div`
  display: flex;
  height: calc(100vh - ${({ theme }) => theme.spacing(8)}); // Full height minus navbar height
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

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [totalSpendings, setTotalSpendings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  const balance = income - totalSpendings;

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
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/income`);
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
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/spendings/total`); 
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
          const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/income/months`);
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
      <Navbar onLogout={handleLogout} />
      <DashboardContainer>
        <LeftPanel />
        <RightContent>
          <Section>
            <DashboardCards
              balance={balance}
              totalSpendings={totalSpendings}
              income={income}
              loading={loading}
            />
          </Section>
          <Section className='chart-section'>
            <h3>Balance</h3>
            <DashboardChart chartData={chartData} />
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