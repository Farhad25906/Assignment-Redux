import Banner from "@/components/module/home/Banner";
import BookCount from "@/components/module/home/BookCount";
import GetStarted from "@/components/module/home/GetStarted";
import LibraryFeatures from "@/components/module/home/LibraryFeatures";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <BookCount />
      <LibraryFeatures />
      <GetStarted />
    </div>
  );
};

export default HomePage;
