import React from 'react'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { theme } from '../../styles/theme';

const DashboardChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="1 2" />
          <XAxis 
            dataKey="name"
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
  );
}

export default DashboardChart;