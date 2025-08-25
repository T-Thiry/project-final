
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const IncomeManagementContainer = styled.div`
  max-width: 400px; /* Set a max-width for the content */
  margin: 40px auto; /* Center the container */
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSize};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.spacing(2)};
`;

const SaveButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const IncomeManagement = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (income <= 0) {
      alert('Please enter a valid income value greater than 0.');
      return;
    }

      try {
      await saveIncomeToAPI(Number(income));
      console.log('Income submitted:', income);
      
      navigate('/dashboard'); // Navigate back to the dashboard after submission
    } catch (error) {
      console.error('Error submitting income:', error);
      alert('Failed to save income. Please try again.');
    }
  };

  const saveIncomeToAPI = async (income) => {
    const response = await fetch('http://localhost:8080/income', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ income }),
    });

    if (!response.ok) {
      throw new Error('Failed to save income');
    }
  };

  return (
    <>
      <Navbar>
          <Logo>StoryBudget</Logo>
          <NavButtons>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </NavButtons>
        </Navbar>
        <IncomeManagementContainer>
        <h2>Manage Income</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="income">Income After Tax:</label>
          <Input
            id="income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter your income after tax"
            required
          />
          <SaveButton type="submit">Save Income</SaveButton>
        </Form>
      </IncomeManagementContainer>
    </>
  );
};

export default IncomeManagement;