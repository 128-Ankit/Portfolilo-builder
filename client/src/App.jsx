// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import TemplateSelection from './pages/TemplateSelection.jsx';
import Editor from './pages/Editor.jsx';
import SinglePortfolio from './pages/SinglePortfolio.jsx';
// import PortfolioView from './pages/PortfolioView.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/templates" element={<TemplateSelection />} />
          <Route path="/editor/:templateId" element={<Editor />} />
          {/* <Route path="/portfolio/:portfolioId" element={<PortfolioView />} /> */}
          <Route path="/single-portfolio/:portfolioId" element={<SinglePortfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;