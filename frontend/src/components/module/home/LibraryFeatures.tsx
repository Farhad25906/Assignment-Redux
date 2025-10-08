import { Link } from "react-router";
import { BookOpen, Library, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import bg from "../../../assets/bg-book2.jpg";

const LibraryFeatures = () => {
  const features = [
    {
      title: "Browse Collection",
      description:
        "Explore our vast collection of books across various genres and categories.",
      icon: <Library className="h-14 w-14" />,
      link: "/books",
      buttonText: "View Books",
    },
    {
      title: "Manage Books",
      description:
        "Add, edit, or remove books from the library collection with ease.",
      icon: <BookOpen className="h-14 w-14" />,
      link: "/create-book",
      buttonText: "Add Book",
    },
    {
      title: "Track Borrowing",
      description:
        "Monitor book borrowing activities and manage returns efficiently.",
      icon: <BarChart3 className="h-14 w-14" />,
      link: "/borrow-summary",
      buttonText: "View Summary",
    },
  ];

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
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-4">
            Library Features
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Everything you need to manage your library efficiently and
            effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#00b9be]"
            >
              <div className="bg-[#00b9be] p-8 flex items-center justify-center">
                <div className="text-white">{feature.icon}</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-base">
                  {feature.description}
                </p>
                <Link to={feature.link}>
                  <Button className="w-full bg-[#00b9be] hover:bg-[#00b9be] text-white font-semibold py-6 text-base transition-all">
                    {feature.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibraryFeatures;