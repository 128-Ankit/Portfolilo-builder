// src/components/TemplateCard.jsx
import { Link } from 'react-router-dom';

function TemplateCard({ template, Imgae, id }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={Imgae.image} alt="img" />
      <h2 className="text-xl font-semibold mb-2">{template.title}</h2>
      <h2 className="text-lg font-semibold mb-2">{template.description}</h2>
      <Link
        to={`/single-portfolio/${id}`}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
      >
        Select Template
      </Link>
    </div>
  );
}

export default TemplateCard;