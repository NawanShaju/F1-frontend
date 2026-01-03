import React from 'react';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
      {message}
    </div>
  );
}
