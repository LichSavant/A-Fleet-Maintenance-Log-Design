import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { vehicleStatusDistribution } from '../../data/fleetData.js';
import ChartTooltip from './ChartTooltip.jsx';
import styles from './VehicleStatusChart.module.css';

const colors = ['#4ADE80', '#D6A85A', '#FACC15', '#EF4444'];

export default function VehicleStatusChart() {
  return (
    <div className={styles.wrap}>
      <ResponsiveContainer height={250} width="100%">
        <PieChart>
          <Tooltip content={<ChartTooltip />} cursor={false} />
          <Pie
            cx="50%"
            cy="50%"
            data={vehicleStatusDistribution}
            dataKey="value"
            innerRadius={66}
            isAnimationActive={false}
            outerRadius={94}
            paddingAngle={4}
            stroke="rgba(7,9,11,.82)"
            strokeWidth={3}
          >
            {vehicleStatusDistribution.map((entry, index) => (
              <Cell fill={colors[index % colors.length]} key={entry.name} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        {vehicleStatusDistribution.map((item, index) => (
          <span key={item.name}>
            <i className={styles[`tone${index}`]} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
