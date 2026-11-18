export default function FilterBar({ children, onClear, canClear }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filters">
      {children}
      <button type="button" onClick={onClear} disabled={!canClear}>
        Clear filters
      </button>
    </div>
  );
}
