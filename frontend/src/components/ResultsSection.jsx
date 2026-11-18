export default function ResultsSection({ title, count, countId, error, filters, children }) {
  return (
    <section className="results-section">
      <h2>{title}</h2>
      {filters}
      {count && <p className="results-count" id={countId} role="status">{count}</p>}
      {children}
      {error && <p className="error-message" role="alert">{error}</p>}
    </section>
  );
}
