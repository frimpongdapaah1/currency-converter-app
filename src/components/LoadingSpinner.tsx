import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
}