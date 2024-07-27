import { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ onLoginSuccess, openRegisterModal, closeModal }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const { email, password } = formData;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // Handle input changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, user);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!'); 
      onLoginSuccess(); 
      
      setTimeout(() => {
        window.location.reload(); 
      }, 2000);
      
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.msg
          ? err.response.data.msg
          : 'Login failed!';
      alert(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <button
        onClick={closeModal}
        className="mt-4 w-full p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Close
      </button>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <button
          onClick={() => {
            closeModal();
            openRegisterModal();
          }}
          className="text-blue-500 hover:underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
