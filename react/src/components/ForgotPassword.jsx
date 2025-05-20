import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const data = await forgotPassword(email);
      if (data.success) {
        setMessage('If that email is registered, you’ll receive a reset link shortly.');
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-blue-50 flex justify-center items-center min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded p-2">
            <Mail className="w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-full disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-600">
          Remembered?{' '}
          <NavLink to="/account" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
