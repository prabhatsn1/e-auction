"use client";
import React from "react";
import { Gavel, Mail, Lock, User, Trophy, ArrowRight, Building } from "lucide-react";

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side - Decorative */}
      <div className="flex flex-col items-center justify-center bg-red-600 p-8 text-white md:w-1/2">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Gavel className="h-16 w-16" />
              <Trophy className="absolute -right-2 -top-2 h-8 w-8 text-yellow-300" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Join Our Auction House</h1>
          <p className="mb-6 text-lg">
            Begin your journey in the world of exclusive auctions and rare collections.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="h-4 w-4" />
              <span>Bid on exclusive items</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="h-4 w-4" />
              <span>List your own auctions</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="h-4 w-4" />
              <span>Join collector communities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex items-center justify-center bg-gray-50 p-8 md:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">Start your auction journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
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
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Company (Optional) */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company (Optional)
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-red-600 hover:text-red-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account?</span>{" "}
              <a href="/login" className="font-medium text-red-600 hover:text-red-500">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
