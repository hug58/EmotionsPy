
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataItem {
  label: string;
  score: number;
}

interface ChartComponentProps {
  data: DataItem[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  return (
    <BarChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="score" fill="#8884d8" />
    </BarChart>
  );  
};

export default ChartComponent;
