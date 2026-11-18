import { useId } from 'react';

export default function FilterSelect({ label, allLabel, value, options, onChange }) {
  const id = useId();

  return (
    <div className="filter-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={event => onChange(event.target.value)}>
        <option value="">{allLabel}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
