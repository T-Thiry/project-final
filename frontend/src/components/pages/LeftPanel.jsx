import React from "react";
import styled from "styled-components";
import { FiBarChart2, FiCreditCard, FiTrendingUp } from 'react-icons/fi';
import { FaCoins } from 'react-icons/fa';

const LeftPanelContainer = styled.div`
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

const LeftPanel = () => {
  return (
    <LeftPanelContainer>
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
    </LeftPanelContainer>
  );
};

export default LeftPanel;