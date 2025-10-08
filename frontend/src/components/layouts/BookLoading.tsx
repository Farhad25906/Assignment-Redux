import React from 'react';
import { BookOpen } from 'lucide-react';

const BookLoading = () => {
  return (
    <div className="flex items-center justify-center space-x-4 p-8">
      {/* Pulsing Book Icon */}
      <BookOpen 
        size={40}
        className="text-[#00b9be] animate-pulse"
      />
      
      {/* Simple Text */}
      <div className="text-[#00b9be] font-medium">
        Loading...
      </div>
    </div>
  );
};

export default BookLoading;