// src/pages/PortfolioView.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioSection from '../components/PortfolioSection.jsx';
import { getPortfolioById } from '../services/api.js';

function PortfolioView() {
  const { portfolioId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await getPortfolioById(portfolioId);
        setPortfolio(response.data);
      } catch (err) {
        setError('Failed to load portfolio');
      }
    };
    fetchPortfolio();
  }, [portfolioId]);

  if (!portfolio) return <div className="text-center p-4">Loading...</div>;

  const { customData } = portfolio;

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="bg-indigo-600 text-white p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold">{customData.header?.title}</h1>
          <p className="text-lg">{customData.header?.subtitle}</p>
        </header>

        {/* About */}
        <PortfolioSection title={customData.about?.title} className="rounded-b-lg">
          <p>{customData.about?.description}</p>
        </PortfolioSection>
      </div>
    </div>
  );
}

export default PortfolioView;