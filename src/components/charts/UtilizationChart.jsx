import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { utilizationByDepot } from '../../data/fleetData.js';
import ChartTooltip from './ChartTooltip.jsx';

export default function UtilizationChart() {
  return (
    <ResponsiveContainer height={284} width="100%">
      <BarChart data={utilizationByDepot} margin={{ bottom: 6, left: -20, right: 8, top: 14 }}>
        <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="depot"
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          domain={[0, 100]}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <Tooltip content={<ChartTooltip />} cursor={false} />
        <Bar
          dataKey="utilization"
          fill="#D6A85A"
          isAnimationActive={false}
          name="Utilization"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="service"
          fill="rgba(255,255,255,.18)"
          isAnimationActive={false}
          name="In Service"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
