// pages/page.tsx or pages/index.tsx (if you want this to be the homepage)
"use client";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-8 text-gray-800">Welcome to GeoTag</h1>
      <p className="text-2xl mb-12 text-gray-600">
        Explore the world and share your favorite places with others.
      </p>
      <Link
        href="/login"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-colors duration-300 cursor-pointer"
      >
        Get Started
      </Link>
      <span className="mt-4">or</span>
      <Link
        href="/signup"
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-colors duration-300 cursor-pointer"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default LandingPage;
