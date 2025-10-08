
import { BookX } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
      <div className="text-center">
        <BookX className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-4">No book found</p>
      </div>
    </div>
  );
};

export default EmptyState;