import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FiHome } from 'react-icons/fi';
import { MdOutlineMovie, MdOutlineRestaurant, MdOutlineLocalCafe } from 'react-icons/md';
import { AiOutlineShoppingCart, AiOutlineCar, AiOutlineSafetyCertificate } from 'react-icons/ai';
import { BiMobileAlt } from 'react-icons/bi';


const VariableExpensesContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing(1)};
`;

const QuadrantCardPair = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Quadrant = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${({ $bgColor, theme }) => $bgColor || theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  span {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  }
`;

const Card = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ $bgColor, theme }) => $bgColor || theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 48px;

  h4 {
    font-size: 1rem;
     font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  }

  p {
    font-size: 1rem;
  }
`;

const VariableExpenses = () => {
  return (
    <>
      <VariableExpensesContainer>
        <QuadrantCardPair>
          <Quadrant $bgColor={theme.colors.limeGreenExtraLight}>
            <FiHome size={20} />
          </Quadrant>
          <Card $bgColor={theme.colors.limeGreenExtraLight}>
            <h4>Grocery</h4>
            <p>SEK 2500</p>
          </Card>
          </QuadrantCardPair>
        <QuadrantCardPair>
          <Quadrant $bgColor={theme.colors.lightGrey}>
            <AiOutlineShoppingCart size={20}  />
          </Quadrant>
          <Card $bgColor={theme.colors.lightGrey}>
            <h4>Shopping</h4>
            <p>SEK 500</p>
          </Card>
        </QuadrantCardPair>
        <QuadrantCardPair>
          <Quadrant $bgColor={theme.colors.pinkLight}>
            <MdOutlineRestaurant size={20} />
          </Quadrant>
          <Card $bgColor={theme.colors.pinkLight}>
            <h4>Restaurants</h4>
            <p>SEK 800</p>
          </Card>
        </QuadrantCardPair>
        <QuadrantCardPair>
          <Quadrant $bgColor={theme.colors.lightGrey}>
            <AiOutlineCar size={20} />
          </Quadrant>
          <Card $bgColor={theme.colors.lightGrey}>
            <h4>Travel</h4>
            <p>SEK 500</p>
          </Card>
        </QuadrantCardPair>
        <QuadrantCardPair>
          <Quadrant $bgColor={theme.colors.limeGreenLight}>
            <MdOutlineMovie size={20} />
          </Quadrant>
          <Card $bgColor={theme.colors.limeGreenLight}>
            <h4>Entertainment</h4>
            <p>SEK 400</p>
          </Card>
        </QuadrantCardPair>
        <QuadrantCardPair>
          <Quadrant $bgColor={theme.colors.pinkExtraLight}>
            <MdOutlineLocalCafe size={20} />
          </Quadrant>
          <Card $bgColor={theme.colors.pinkExtraLight}>
            <h4>Cafe</h4>
            <p>SEK 400</p>
          </Card>
        </QuadrantCardPair>
      </VariableExpensesContainer>
    </>
  );
};

export default VariableExpenses;