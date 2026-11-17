export default function Welcome({ title, children }) {
  return (
    <section className="welcome">
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}
