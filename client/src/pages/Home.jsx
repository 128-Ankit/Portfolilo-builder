// src/pages/Home.jsx
import { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.jsx';

function Home() {
  // const { user } = useAuth();
  const [token, setTocken] = useState(null);
  useEffect(()=>{
    setTocken(localStorage.getItem('token'))
  },[])

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Portfolio Builder</h1>
      <p className="text-lg mb-6">Create a stunning portfolio in minutes!</p>
      {token ? (
        <Link to="/templates" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
          Get Started
        </Link>
      ) : (
        <Link to="/signup" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
          Sign Up Now
        </Link>
      )}
    </div>
  );
}

export default Home;