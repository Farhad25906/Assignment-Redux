
import { AlertCircle } from 'lucide-react';

const ErrorComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-500 text-lg font-medium">Something went wrong!</p>
      </div>
    </div>
  );
};

export default ErrorComponent;