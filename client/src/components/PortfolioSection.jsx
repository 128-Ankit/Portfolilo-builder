// src/components/PortfolioSection.jsx
function PortfolioSection({ title, children, className }) {
  return (
    <section className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default PortfolioSection;