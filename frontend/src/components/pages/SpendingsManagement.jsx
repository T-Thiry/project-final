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

const SpendingsManagement = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

      try {
      await saveSpendingToAPI(category, Number(amount));
      console.log('Spending submitted:', { category, amount });
      
      navigate('/dashboard'); // Navigate back to the dashboard after submission
    } catch (error) {
      console.error('Error submitting spedning:', error);
      alert('Failed to save spending. Please try again.');
    }
  };

  const saveSpendingToAPI = async (category, amount) => {
    const response = await fetch('http://localhost:8080/spendings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, amount
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save spending');
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
        <h2>Manage Spendings</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="category">Category:</label>
          <select 
          id="category" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          >
            <option value="" disabled>Select a category</option>
            <option value="grocery">Grocery</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="restaurants">Restaurants</option>
            <option value="cafe">Cafe</option>
            <option value="travel">Travel</option>
            <option value="others">Others</option>
          </select>
          <label htmlFor="amount">Amount:</label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter your the amount"
            required
          />
          <SaveButton type="submit">Save Spending</SaveButton>
        </Form>
      </IncomeManagementContainer>
    </>
  );
};

export default SpendingsManagement;