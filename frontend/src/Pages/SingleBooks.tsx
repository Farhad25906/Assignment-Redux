import { useParams, Link } from "react-router";
import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import { ArrowLeft, Edit, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { BorrowBookModal } from "@/components/module/borrowBook/BorrowBookModal";
import BookLoading from "@/components/layouts/BookLoading";
import ErrorComponent from "@/components/layouts/ErrorComponent";
import EmptyState from "@/components/layouts/EmptyState";

const SingleBooks = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = () => {
    if (id) {
      deleteBook(id);
      toast.success("Book deleted successfully!", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  if (isLoading) return <BookLoading />;

  if (isError) return <ErrorComponent />;

  if (!data || !data.data) <EmptyState />;

  const book = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to All Books
        </Link>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-6" style={{ backgroundColor: "#00b9be" }}>
            <h1 className="text-3xl font-bold text-white">{book.title}</h1>
            <p className="text-white/90 mt-2">Book Details</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Part - Basic Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-300 pb-3">
                    <span className="w-1 h-6 bg-[#00b9be] rounded-full"></span>
                    Basic Information
                  </h3>
                  <div className="space-y-5">
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
                      <label className="text-xs font-semibold text-[#00b9be] uppercase tracking-wide mb-1 block">
                        Title
                      </label>
                      <p className="text-lg font-bold text-gray-900">
                        {book.title}
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
                      <label className="text-xs font-semibold text-[#00b9be] uppercase tracking-wide mb-1 block">
                        Author
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {book.author}
                      </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
                      <label className="text-xs font-semibold text-[#00b9be] uppercase tracking-wide mb-2 block">
                        Genre
                      </label>
                      <span className="text-lg font-semibold text-gray-900">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Part - Description & Actions (Redesigned) */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-300 pb-3">
                    <span className="w-1 h-6 bg-[#00b9be] rounded-full"></span>
                    Description & Actions
                  </h3>

                  {book.description && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-cyan-100 shadow-sm hover:shadow-md transition-shadow mb-5">
                      <label className="text-xs font-semibold text-[#00b9be] uppercase tracking-wide mb-2 block flex items-center gap-2">
                        <BookOpen size={14} />
                        Book Description
                      </label>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {book.description}
                      </p>
                    </div>
                  )}

                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-cyan-100 shadow-sm">
                    <label className="text-xs font-semibold text-[#00b9be] uppercase tracking-wide mb-3 block">
                      Available Actions
                    </label>
                    <div className="space-y-3">
                      <BorrowBookModal
                        bookId={book._id}
                        bookTitle={book.title}
                        availableQuantity={book.copies || 1}
                        trigger={
                          <Button
                            className="w-full bg-[#00b9be] hover:bg-[#00a5aa]"
                            disabled={!book.available}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Borrow Book
                          </Button>
                        }
                      />

                      <Link to={`/edit-book/${book._id}`}>
                        <Button
                          variant="outline"
                          className="w-full border-[#00b9be] text-[#00b9be] hover:bg-cyan-50"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Book
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        onClick={handleDelete}
                        className="w-full border-red-500 text-red-600 hover:bg-red-50 mt-2.5"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBooks;
