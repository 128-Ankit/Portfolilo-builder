// src/pages/TemplateSelection.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard.jsx';
import { getTemplates } from '../services/api.js';

function TemplateSelection() {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    // console.log("token from template: ", token);
    // if (token) {
    //   navigate('/login');
    //   return;
    // }

    const fetchTemplates = async () => {
      try {
        const response = await getTemplates();
        setTemplates(response.data);
      } catch (err) {
        setError('Failed to load templates');
      }
    };
    fetchTemplates();
  }, [token, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose a Template</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard 
            key={template._id} 
            id={template._id}
            template={template.home} 
            Imgae={template.about} 
          />
        ))}
      </div>
    </div>
  );
}

export default TemplateSelection;