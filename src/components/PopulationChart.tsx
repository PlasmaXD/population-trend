import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  data: any[];
  selectedPrefectures: number[];
  prefNames: { [key: number]: string };
}

const getColor = (index: number) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#888888'];
  return colors[index % colors.length];
};

const PopulationChart: React.FC<Props> = ({ data, selectedPrefectures, prefNames }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedPrefectures.map((prefCode, index) => (
          <Line
            key={prefCode}
            type="monotone"
            dataKey={`pref_${prefCode}`}
            name={prefNames[prefCode]}
            stroke={getColor(index)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PopulationChart;
