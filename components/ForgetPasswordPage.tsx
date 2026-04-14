"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Gavel, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password reset logic here
    setIsEmailSent(true);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side - Decorative */}
      <div className="flex flex-col items-center justify-center bg-red-600 p-8 text-white md:w-1/2">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <Gavel className="h-16 w-16" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">Account Recovery</h1>
          <p className="mb-6 text-lg">
            Don't worry! It happens to the best of us. We'll help you get back to your auctions in
            no time.
          </p>
          <div className="space-y-4 text-sm">
            <p className="text-white/80">
              We'll send you a secure link to reset your password and regain access to your account.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Form */}
      <div className="flex items-center justify-center bg-gray-50 p-8 md:w-1/2">
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
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                        placeholder="Enter your registered email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Send Reset Instructions
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
              <p className="text-gray-600">
                We've sent password reset instructions to your email address. Please check your
                inbox and follow the link to reset your password.
              </p>
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or request a new link in a few
                minutes.
              </p>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="text-center">
            <a
              href="/login"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
