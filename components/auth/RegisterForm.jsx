'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { Alert } from '../ui/Alert';
import { AlertDescription } from '../ui/AlertDescription';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
  });

  const { register, loginWithGoogle, isLoading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto border border-gray-100">
      <div className="pb-6 mb-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Account</h2>
        <p className="text-center text-gray-500 mt-2">Join us on this amazing journey</p>
      </div>

      <div className="mb-6">
        {error && (
          <Alert variant="destructive" className="mb-6 rounded-lg">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-2 flex items-center justify-center hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
          <p>Continue with Google</p>
        </Button>
      </div>

      <div className="pt-6 mt-6 border-t flex justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
