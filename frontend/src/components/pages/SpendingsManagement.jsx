import React, { useEffect, useState } from 'react';
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

const SpendingsManagementContainer = styled.div`
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

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const SpendingsManagement = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [spendings, setSpendings] = useState([]);

  useEffect(() => {
    const fetchSpendings = async () => {
      try {
        const response = await fetch('http://localhost:8080/spendings');
        if (!response.ok) {
          throw new Error('Failed to fetch spendings');
        }
        const data = await response.json();
        setSpendings(data);
      } catch (error) {
        console.error('Error fetching spendings:', error);
      }
    };

    fetchSpendings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    try {
      const newSpending = await saveSpendingToAPI(category, Number(amount));
      console.log('Spending submitted:', newSpending);

      setSpendings(prevSpendings => [...prevSpendings, newSpending]);
      setCategory('');
      setAmount('');
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

    const newSpending = await response.json(); // Parse the response to get the new spending
    return newSpending;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this spending?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:8080/spendings/${id}`, {
        method: 'DELETE',
      });
      setSpendings((prevSpendings) => prevSpendings.filter((spending) => spending._id !== id));
    } catch (error) {
      console.error('Error deleting spending:', error);
      alert('Failed to delete spending. Please try again.');
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
        <SpendingsManagementContainer>
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
            <option value="Rent">Rent</option>
            <option value="Parking">Parking</option>
            <option value="Insurance">Insurance</option>
            <option value="Broadband">Broadband</option>
            <option value="Phone">Phone</option>
            <option value="Grocery">Grocery</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Cafe">Cafe</option>
            <option value="Travel">Travel</option>
            <option value="Others">Others</option>
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
          <SaveButton type="submit">Add Spending</SaveButton>
        </Form>
        <CardContainer>
          {spendings.map((spending) => (
            <Card key={spending._id}>
              <DeleteIcon onClick={() => handleDelete(spending._id)}>
                <FiX />
              </DeleteIcon>
              <h4>{capitalizeFirstLetter(spending.category)}</h4>
              <p>Amount: SEK {spending.amount}</p>
              <p>Date: {new Date(spending.createdAt).toLocaleDateString()}</p>
            </Card>
          ))}
        </CardContainer>
      </SpendingsManagementContainer>
    </>
  );
};

export default SpendingsManagement;