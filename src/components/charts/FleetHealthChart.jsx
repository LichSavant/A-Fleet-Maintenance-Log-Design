import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fleetHealth } from '../../data/fleetData.js';
import ChartTooltip from './ChartTooltip.jsx';

export default function FleetHealthChart() {
  return (
    <ResponsiveContainer height={292} width="100%">
      <AreaChart data={fleetHealth} margin={{ bottom: 6, left: -20, right: 8, top: 14 }}>
        <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="month"
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
        <Area
          dataKey="readiness"
          fill="rgba(214,168,90,.16)"
          isAnimationActive={false}
          name="Readiness"
          stroke="#D6A85A"
          strokeWidth={3}
          type="monotone"
        />
        <Area
          dataKey="utilization"
          fill="rgba(74,222,128,.08)"
          isAnimationActive={false}
          name="Utilization"
          stroke="#4ADE80"
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
