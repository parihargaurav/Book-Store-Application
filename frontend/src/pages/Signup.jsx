import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';

function Signup() {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email and password are required');
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        signupInfo,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { success, message, error } = response.data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message);
      } else {
        handleError(message);
      }

    } catch (err) {
      // Axios error handling
      const errorMsg =
        err.response?.data?.message || err.message;
      handleError(errorMsg);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-50 mx-3.5">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
    
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h1>

      <form onSubmit={handleSignup} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-green-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-green-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-green-500 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <Link to="/login" className="text-blue-600 font-medium ml-1">
          Login
        </Link>
      </p>

      <ToastContainer />
    </div>
  </div>
);

}

export default Signup;
