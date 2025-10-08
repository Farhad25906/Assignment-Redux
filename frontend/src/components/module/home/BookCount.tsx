import { BookOpen, Library, Users, BarChart3 } from "lucide-react";

const BookCount = () => {
  const stats = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      label: "Total Books",
      value: "1,254",
    },
    {
      icon: <Users className="h-8 w-8" />,
      label: "Active Readers",
      value: "892",
    },
    {
      icon: <Library className="h-8 w-8" />,
      label: "Categories",
      value: "24",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      label: "Books Borrowed",
      value: "156",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#00b9be] hover:border-black hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#00b9be] hover:text-black uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold text-[#00b9be] hover:text-black mt-3">
                    {stat.value}
                  </p>
                </div>
                <div className="p-4 rounded-full bg-[#00b9be] text-white group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookCount;