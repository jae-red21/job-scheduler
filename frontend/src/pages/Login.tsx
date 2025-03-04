import axios, { AxiosError } from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent ) => {
    e.preventDefault();
    try {
        axios.post('http://localhost:8000/api/auth/login', {
          email, password,
        })
    }catch (error ) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        console.error('Login failed:', axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('No response received:', axiosError.request);
      } else {
        // Something happened in setting up the request
        console.error('Error:', axiosError.message);
      }    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Job Scheduler System</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value) }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value) }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
