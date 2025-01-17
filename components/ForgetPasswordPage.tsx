/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Gavel, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password reset logic here
    setIsEmailSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Decorative */}
      <div className="bg-red-600 md:w-1/2 p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <Gavel className="h-16 w-16" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Account Recovery</h1>
          <p className="text-lg mb-6">
            Don't worry! It happens to the best of us. We'll help you get back to your auctions in no time.
          </p>
          <div className="space-y-4 text-sm">
            <p className="text-white/80">
              We'll send you a secure link to reset your password and regain access to your account.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Form */}
      <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {!isEmailSent ? (
            <>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                <p className="mt-2 text-gray-600">
                  Enter your email address to receive recovery instructions
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your registered email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Send Reset Instructions
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
              <p className="text-gray-600">
                We've sent password reset instructions to your email address. Please check your inbox and follow the link to reset your password.
              </p>
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or request a new link in a few minutes.
              </p>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="text-center">
            <a 
              href="/login" 
              className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}