import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
  color?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  dataKey,
  xAxisKey,
  title,
  color = '#39FF14',
}) => {
  return (
    <div className="w-full">
      {title && (
        <h3 className="font-poppins font-semibold text-lg mb-4 text-neutral-black">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#B0BEC5" opacity={0.3} />
          <XAxis dataKey={xAxisKey} stroke="#1A1A1A" fontSize={12} />
          <YAxis stroke="#1A1A1A" fontSize={12} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #B0BEC5',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={{ fill: color, strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, fill: color, stroke: '#ffffff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;