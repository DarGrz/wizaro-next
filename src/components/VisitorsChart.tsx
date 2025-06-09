'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type Props = {
  data: { date: string; count: number }[];
};

export default function VisitorsChart({ data }: Props) {
  // Calculate proper domain for YAxis based on actual data
  const maxCount = Math.max(...data.map(item => item.count));
  const yAxisMax = Math.ceil(maxCount * 1.1); // Add 10% padding

  // Format large numbers for readability
  const formatYAxisTick = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return String(value);
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-6 h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            allowDecimals={false}
            domain={[0, yAxisMax]} 
            tickFormatter={formatYAxisTick}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toLocaleString()}`, 'Visitors']}
            contentStyle={{ fontSize: 12 }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#002a5c" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: "#002a5c" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}