// src/pages/Editor.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemplateById, createPortfolio, getHome, updateHome } from '../services/api.js';
// import { useAuth } from '../context/AuthContext.jsx';

function Editor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  // const { user } = useAuth();
  const [template, setTemplate] = useState(null);
  const [customData, setCustomData] = useState({});
  const [homeData, setHomeData] = useState({ title: '', subtitle: '', bio: '' });
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    // if (!user) {
    //   navigate('/login');
    //   return;
    // }
    setToken(localStorage.getItem('token'));

    const fetchData = async () => {
      try {
        // Fetch the template
        const templateResponse = await getTemplateById(templateId);
        setTemplate(templateResponse.data);
        setCustomData(templateResponse.data.structure);

        // Fetch the home section
        try {
          const homeResponse = await getHome();
          console.log("homeResponse: ",homeResponse);
          setHomeData({
            title: homeResponse.data.title || '',
            subtitle: homeResponse.data.subtitle || '',
            bio: homeResponse.data.bio || '',
          });
        } catch (err) {
          if (err.response?.status !== 404) {
            setError('Failed to load home section');
          }
        }
      } catch (err) {
        setError('Failed to load template');
      }
    };
    fetchData();
  }, [templateId, token, navigate]);

  const handleCustomDataChange = (e, section, field) => {
    setCustomData({
      ...customData,
      [section]: {
        ...customData[section],
        [field]: e.target.value,
      },
    });
  };

  const handleHomeDataChange = (e) => {
    setHomeData({ ...homeData, [e.target.name]: e.target.value });
  };

//update portfolio by user
  const handleSubmit = async () => {
    try {
      // Save the home section
      await updateHome(homeData);

      // Save the portfolio
      const response = await createPortfolio({
        templateId,
        customData,
        customStyles: {}, // Add custom styles if needed
      });

      navigate(`/portfolio/${response.data.portfolioId}`);
    } catch (err) {
      setError('Failed to save portfolio');
    }
  };

  if (!template) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Customize Your Portfolio</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        {/* Home Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Home Section</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={homeData.title}
              onChange={handleHomeDataChange}
              className="w-full p-2 border rounded"
              placeholder="Welcome to My Portfolio"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={homeData.subtitle}
              onChange={handleHomeDataChange}
              className="w-full p-2 border rounded"
              placeholder="I am a passionate developer"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bio</label>
            <textarea
              name="bio"
              value={homeData.bio}
              onChange={handleHomeDataChange}
              className="w-full p-2 border rounded"
              placeholder="Tell us about yourself"
              rows="4"
            />
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Header</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={customData.header?.title || ''}
              onChange={(e) => handleCustomDataChange(e, 'header', 'title')}
              className="w-full p-2 border rounded"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={customData.header?.subtitle || ''}
              onChange={(e) => handleCustomDataChange(e, 'header', 'subtitle')}
              className="w-full p-2 border rounded"
              placeholder="Your Profession"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={customData.about?.description || ''}
              onChange={(e) => handleCustomDataChange(e, 'about', 'description')}
              className="w-full p-2 border rounded"
              placeholder="Tell us about yourself"
              rows="4"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Save and Get Link
        </button>
      </div>
    </div>
  );
}

export default Editor;