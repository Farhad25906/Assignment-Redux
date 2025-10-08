import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const GetStarted = () => {
  return (
    <section className="py-24 bg-[#00b9be]">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of libraries that use our system to manage their
          collections and serve their communities better.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/books">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-[#00b9be] px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Explore Library
            </Button>
          </Link>
          <Link to="/create-book">
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#00b9be] px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Add New Book
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;