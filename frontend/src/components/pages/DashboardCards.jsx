import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

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

const DashboardCards = ({ balance, totalSpendings, income, loading }) => {
  const navigate = useNavigate();

  return (
    <CardContainer>
      <Card $bgColor={theme.colors.limeGreenExtraLight}>
        <span className="edit-icon">
          <FiEdit />
        </span>
        <h4>Balance</h4>
        {loading ? null : <p>SEK {balance}</p>}
        <span>Additional Info</span>
      </Card>
      <Card $bgColor={theme.colors.greyLight}>
        <span className="edit-icon" onClick={() => navigate('/spendings-management')} >
          <FiEdit />
        </span>
        <h4>Spendings</h4>
        {loading ? null : <p>SEK {totalSpendings}</p>}
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
  );
}

export default DashboardCards;
