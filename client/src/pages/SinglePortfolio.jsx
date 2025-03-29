import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SinglePortfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const { portfolioId } = useParams();
  console.log("portfolioId: ",portfolioId);
  

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/portfolio/get/${portfolioId}`);
        setPortfolio(response.data);
        console.log("response: ",response.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [portfolioId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bio Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-8">
          <img src={portfolio.image} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{portfolio.home?.title}</h1>
            <p className="text-gray-600">{portfolio.bio}</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">Email:</span> {portfolio.contact?.email}</p>
          <p><span className="font-semibold">Phone:</span> {portfolio.contact?.phone}</p>
          <div className="flex gap-4 mt-4">
            {portfolio.contact?.socialLinks && Object.entries(portfolio.contact.socialLinks).map(([platform, link]) => (
              <a key={platform} href={link} target="_blank" rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.projects?.map((project) => (
            <div key={project._id} className="border rounded-lg p-4">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.services?.map((service) => (
            <div key={service._id} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePortfolio;
