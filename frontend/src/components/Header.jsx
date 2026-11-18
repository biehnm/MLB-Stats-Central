const links = [
  { path: '/', label: 'Players' },
  { path: '/teams.html', label: 'Teams' },
  { path: '/games.html', label: 'Games' },
];

export default function Header({ activePath }) {
  return (
    <header>
      <h1>MLB Stats Central</h1>
      <p>2026 Season Tracker</p>
      <nav aria-label="Main navigation">
        {links.map(({ path, label }) => (
          <a key={path} href={path} aria-current={path === activePath ? 'page' : undefined}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
