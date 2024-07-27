import { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = ({ onRegisterSuccess, closeModal, openLoginModal }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const { username, email, password, role } = formData;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // Handle input changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, email, password, role };
    
    try {
      await axios.post(`${baseUrl}/api/auth/register`, newUser);
      alert('Registration successful!'); 
      onRegisterSuccess(); 
      
      setTimeout(() => {
        closeModal();
        openLoginModal();
      }, 1500); 
      
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.msg
          ? err.response.data.msg
          : 'Registration failed!';
      alert(errorMessage); 
      console.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={onChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
          >
            <option value="user">User</option>
            <option value="admin">Admin for +AddFlight</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <button
        onClick={closeModal}
        className="mt-4 w-full p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Close
      </button>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <button
          onClick={() => {
            closeModal();
            openLoginModal();
          }}
          className="text-blue-500 hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default Register;
