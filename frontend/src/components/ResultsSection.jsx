export default function ResultsSection({ title, count, countId, error, children }) {
  return (
    <section className="players-section">
      <h2>{title}</h2>
      <p id={countId}>{count}</p>
      {children}
      <p id="error-message">{error}</p>
    </section>
  );
}
