import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found!</h1>
      <p className="text-gray-700 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 font-semibold underline underline-offset-4 hover:text-blue-800">
        Go to Dashboard Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
