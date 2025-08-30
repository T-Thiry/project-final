import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FiHome, FiWifi } from 'react-icons/fi';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { BiMobileAlt } from 'react-icons/bi';
import MascotImageFile from '../../assets/images/Mascot.svg';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
  `;

const Card = styled.div`
  background-color: ${({ bgColor, theme }) => bgColor || theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(25% - ${({ theme }) => theme.spacing(2)});
  min-width: 100px;
  
  height: auto;

  h4 {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
    margin: ${({ theme }) => theme.spacing(1)} 0;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
`;

const SummaryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
`;

const MascotImage = styled.img`
  width: 100px;
  height: auto;
  margin-top: ${({ theme }) => theme.spacing(4)};
  transform: scaleX(-1);
`;

const FixedExpenses = () => {
  return (
    <div>
      <CardContainer>
        <Card bgColor={theme.colors.limeGreenExtraLight}>
          <FiHome size={20} />
          <h4>Rent</h4>
          <p>SEK 9600</p>
        </Card>
        <Card bgColor={theme.colors.greyLight}>
          <FiHome size={20} />
          <h4>Parking</h4>
          <p>SEK 1000</p>
        </Card>
        <Card bgColor={theme.colors.pinkLight}>
           <AiOutlineSafetyCertificate size={20} />
          <h4>Insurance</h4>
          <p>SEK 400</p>
        </Card>
        <Card bgColor={theme.colors.greyLight}>
          <FiWifi size={20} />
          <h4>Broadband</h4>
          <p>SEK 500</p>
        </Card>
      </CardContainer>
      <SummaryContainer>
        <div>
          <h3>Monthly Summary</h3>
          <p>
            You have saved 7000 SEK towards your “Trip to Quebec”, that is already 20% of your goal! This month, you spent a
            bit more on food than last, but your variable expenses were still lower than average. Great job overall, you
            ended up with a positive balance of 7 000 SEK this month!
          </p>
        </div>
        <MascotImage src={MascotImageFile} alt="Mascot" />
      </SummaryContainer>
    </div>
  );
}

export default FixedExpenses;