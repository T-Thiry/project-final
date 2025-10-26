
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

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

const CardContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  h4 {
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  p {
  margin: 0;

  .actions {
    margin-top: ${({ theme }) => theme.spacing(2)};
    display: flex;
    justify-content: space-between;
}
`;

const DeleteIcon = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1rem;
  cursor: pointer;
`;

const IncomeManagement = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState('');
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState('');

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/income/months`);
        if (!response.ok) {
          throw new Error('Failed to fetch months');
        }
        const data = await response.json();
        setMonths(data);
      } catch (error) {
        console.error('Error fetching months:', error);
      }
    };

    fetchMonths();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (income <= 0) {
      alert('Please enter a valid income greater than 0.');
      return;
    }

    if (!month) {
      alert('Please enter a valid month.');
      return;
    }

      try {
      await saveIncomeToAPI(Number(income), month);
      console.log('Income submitted:', income, month);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error submitting income:', error);
      alert('Failed to save income. Please try again.');
    }
  };

  const saveIncomeToAPI = async (income, month) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/income`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: income, month }),
    });

    if (!response.ok) {
      throw new Error('Failed to save income');
    }

    const newIncome = await response.json(); // Parse the response to get the new spending
    return newIncome;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this month?');
    if (!confirmDelete) return;

    try {
      await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/income/${id}`, {
        method: 'DELETE',
      });
      setMonths((prevMonths) => prevMonths.filter((month) => month._id !== id));
    } catch (error) {
      console.error('Error deleting month:', error);
      alert('Failed to delete month. Please try again.');
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
          <label htmlFor="month">Month:</label>
          <Input
            id="month"
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="e.g. January"
            required
          />
          <label htmlFor="income">Income After Tax:</label>
          <Input
            id="income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="e.g. 26000"
            required
          />
          <SaveButton type="submit">Save Income</SaveButton>
        </Form>
         <CardContainer>
                  {months.map((month) => (
                    <Card key={month._id}>
                      <DeleteIcon onClick={() => handleDelete(month._id)}>
                        <FiX />
                      </DeleteIcon>
                      <p>Month: {month.month}</p>
                      <p>Amount: SEK {month.amount}</p>
                      <p>Date: {month.createdAt ? new Date(month.createdAt).toLocaleDateString() : "N/A"}</p>
                    </Card>
                  ))}
                </CardContainer>
      </IncomeManagementContainer>
    </>
  );
};

export default IncomeManagement;