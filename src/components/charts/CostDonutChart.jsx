import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { costByCategory } from '../../data/fleetData.js';
import ChartTooltip from './ChartTooltip.jsx';
import styles from './CostDonutChart.module.css';

const colors = ['#D6A85A', '#4ADE80', '#FACC15', '#93C5FD', 'rgba(255,255,255,.28)'];

export default function CostDonutChart() {
  return (
    <div className={styles.wrap}>
      <ResponsiveContainer height={236} width="100%">
        <PieChart>
          <Tooltip content={<ChartTooltip />} cursor={false} />
          <Pie
            cx="50%"
            cy="50%"
            data={costByCategory}
            dataKey="value"
            innerRadius={64}
            isAnimationActive={false}
            outerRadius={88}
            paddingAngle={4}
            stroke="rgba(7,9,11,.82)"
            strokeWidth={3}
          >
            {costByCategory.map((entry, index) => (
              <Cell fill={colors[index % colors.length]} key={entry.name} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        {costByCategory.map((item, index) => (
          <span key={item.name}>
            <i className={styles[`tone${index}`]} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
