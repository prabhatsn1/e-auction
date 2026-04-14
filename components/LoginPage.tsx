"use client";
import React from "react";
import { Gavel, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side - Decorative */}
      <div className="flex flex-col items-center justify-center bg-red-600 p-8 text-white md:w-1/2">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <Gavel className="h-16 w-16 animate-bounce" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">Premium Auctions</h1>
          <p className="mb-6 text-lg">
            Join our exclusive community of collectors and sellers in the world&apos;s most
            prestigious online auction house.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="h-4 w-4" />
              <span>Access to rare and unique items</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="h-4 w-4" />
              <span>Real-time bidding system</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="h-4 w-4" />
              <span>Secure transactions guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center bg-gray-50 p-8 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
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
                    placeholder="Enter your email"
                  />
                </div>
              </div>

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
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don&apos;t have an account?</span>{" "}
              <a href="/register" className="font-medium text-red-600 hover:text-red-500">
                Register now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
