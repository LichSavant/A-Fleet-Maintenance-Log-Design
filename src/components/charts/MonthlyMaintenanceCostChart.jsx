import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { monthlyMaintenanceCost } from '../../data/fleetData.js';
import ChartTooltip from './ChartTooltip.jsx';

export default function MonthlyMaintenanceCostChart() {
  return (
    <ResponsiveContainer height={292} width="100%">
      <BarChart data={monthlyMaintenanceCost} margin={{ bottom: 6, left: -20, right: 8, top: 14 }}>
        <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickFormatter={(value) => `$${value}K`}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <Tooltip content={<ChartTooltip />} cursor={false} />
        <Bar dataKey="preventive" fill="#D6A85A" isAnimationActive={false} name="Preventive" radius={[10, 10, 0, 0]} />
        <Bar dataKey="corrective" fill="rgba(74,222,128,.72)" isAnimationActive={false} name="Corrective" radius={[10, 10, 0, 0]} />
        <Bar dataKey="tires" fill="rgba(250,204,21,.72)" isAnimationActive={false} name="Tires" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
