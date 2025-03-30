import { useState, useContext } from "react";
import { login as loginApi } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginApi(formData);
      login(userData);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const authContent = {
    title: "Welcome\nBack",
    subtitle: "Continue your journey with us",
    features: ['Secure Access', 'Fast Login', 'Smart Dashboard', 'Personal Profile']
  };

  return (
    <AuthLayout {...authContent}>
      <div className="mb-8 relative">
        <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-blue-200/60">Access your account</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-900/20 border-l-4 border-red-500 p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div className="space-y-4">
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
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-blue-200/60">
            <input type="checkbox" className="rounded border-blue-800/50 text-blue-500 focus:ring-blue-500 bg-blue-950/30" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#020420] transition-all duration-200 border border-white/10 hover:border-white/25"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-blue-200/60">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginForm;
