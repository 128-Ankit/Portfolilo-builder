// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  const [token, setTocken] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem('token');
    setTocken(data);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
  }

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Portfolio Builder</Link>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/templates" className="hover:underline">Templates</Link>
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="hover:underline">Signup</Link>
              <Link to="/login" className="hover:underline">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;