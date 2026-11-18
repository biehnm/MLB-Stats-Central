export default function DataTable({ columns, bodyId, message, children }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map(column => <th key={column} scope="col">{column}</th>)}
          </tr>
        </thead>
        <tbody id={bodyId}>
          {message ? <tr><td colSpan={columns.length}>{message}</td></tr> : children}
        </tbody>
      </table>
    </div>
  );
}
