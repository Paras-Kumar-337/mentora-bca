import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-6">

      <div className="text-center">

        {/* 404 Text */}
        <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <p className="mt-4 text-gray-400 text-lg">
          Lost in space? This page doesn’t exist.
        </p>

        {/* Subtle AI vibe */}
        <p className="mt-2 text-sm text-gray-500">
          ARIA couldn’t find what you’re looking for...
        </p>

        {/* Button */}
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:scale-105 transition"
          >
            Go Back to Dashboard
          </Link>
        </div>

      </div>

    </div>
  );
}