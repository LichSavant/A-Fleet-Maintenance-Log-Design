import StatusBadge from './StatusBadge.jsx';
import styles from './Table.module.css';

export default function Table({ columns, data }) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id || row.vin || row.name}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.badge ? (
                    <StatusBadge status={row[column.key]}>{row[column.key]}</StatusBadge>
                  ) : column.render ? (
                    column.render(row)
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
