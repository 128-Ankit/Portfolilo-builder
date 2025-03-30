import { useState, useContext } from "react";
import { signup } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    role: "user"
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await signup(formData);
      login(userData);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const authContent = {
    title: "Welcome to\nThe Future",
    subtitle: "Experience the next generation platform",
    features: ['AI Powered', 'Blockchain Ready', 'Cloud Native', 'Smart Analytics']
  };

  return (
    <AuthLayout {...authContent}>
      <div className="mb-8 relative">
        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-blue-200/60">Join our community of innovators</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-900/20 border-l-4 border-red-500 p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div className="space-y-4">
          <AuthInput
            label="Full Name"
            name="name"
            required
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <AuthInput
            label="Email"
            type="email"
            name="email"
            required
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <AuthInput
            label="Password"
            type="password"
            name="password"
            required
            onChange={handleChange}
            placeholder="••••••••"
          />
          <AuthInput
            label="Avatar"
            type="text"
            name="avatar"
            required
            onChange={handleChange}
            placeholder="Your image url..."
          />
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-blue-300">Role</label>
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              className="mt-1 block w-full bg-blue-950/30 border border-blue-800/50 rounded-lg px-4 py-2 text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#020420] transition-all duration-200 border border-white/10 hover:border-white/25"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-blue-200/60">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterForm;
