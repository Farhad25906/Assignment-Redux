import { Link } from "react-router";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import bg from "../../../assets/bg-book.jpg";

const Banner = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url("${bg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
     
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to <span className="text-[#00b9be]">Library</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Manage your library collection, track borrowing activities, and
            provide seamless access to knowledge with our comprehensive library
            management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books">
              <Button
                size="lg"
                className="bg-[#00b9be] hover:bg-[#009fa3] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Explore Library
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/create-book">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#00b9be] text-[#00b9be] hover:bg-[#00b9be] hover:text-white px-8 py-6 text-lg font-semibold transition-all"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Book
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
