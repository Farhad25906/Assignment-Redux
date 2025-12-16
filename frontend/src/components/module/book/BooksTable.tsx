import { TableRow, TableCell } from "@/components/ui/table";
import { Edit, Eye, Plus, Trash2, X } from "lucide-react";
import type { IBook } from "@/type";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { BorrowBookModal } from "../borrowBook/BorrowBookModal";
import { useState } from "react";

interface BooksTableProps {
  data: IBook;
}

const BooksTable = ({ data }: BooksTableProps) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteBook(data._id).unwrap();
      toast.success("Book deleted successfully!", {
        duration: 2000,
        position: "top-right",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      setShowDialog(false);
    } catch (error) {
      toast.error("Failed to delete book. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <TableRow key={data._id} className="hover:bg-gray-50/50 transition-colors">
        <TableCell className="font-medium">{data.title}</TableCell>
        <TableCell className="text-gray-700">{data.author}</TableCell>
        <TableCell>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {data.genre}
          </span>
        </TableCell>
        <TableCell className="font-mono text-sm text-gray-600">
          {data.isbn}
        </TableCell>
        <TableCell className="text-center font-semibold">{data.copies}</TableCell>
        <TableCell>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              data.available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {data.available ? "Yes" : "No"}
          </span>
        </TableCell>
        <TableCell>
          <div className="flex items-center justify-center gap-2">
            <Link
              to={`/books/${data._id}`}
              className="p-2 rounded-lg bg-blue-800 text-white hover:bg-blue-800 transition-all duration-200 hover:scale-105 flex items-center justify-center"
              title="View Book"
            >
              <Eye size={16} />
            </Link>
            <BorrowBookModal
              bookId={data._id}
              bookTitle={data.title}
              availableQuantity={data.copies || 1}
              trigger={
                <Button
                  className="p-2 rounded-lg text-white hover:opacity-80 transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "#00b9be" }}
                  title="Borrow Book"
                >
                  <Plus size={16} />
                </Button>
              }
            />
            <Link
              to={`/edit-book/${data._id}`}
              className="p-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-all duration-200 hover:scale-105 flex items-center justify-center"
              title="Edit Book"
            >
              <Edit size={16} />
            </Link>
            <button
              onClick={() => setShowDialog(true)}
              className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 hover:scale-105"
              title="Delete Book"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </TableCell>
      </TableRow>

      {/* Custom Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 backdrop-blur-sm bg-white/30 transition-all"
            onClick={() => !isLoading && setShowDialog(false)}
          />
          
          {/* Dialog */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10 animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => !isLoading && setShowDialog(false)}
              disabled={isLoading}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Are you absolutely sure?
              </h3>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                This action cannot be undone. This will permanently delete the book{" "}
                <span className="font-semibold text-gray-900">"{data.title}"</span> by{" "}
                <span className="font-semibold text-gray-900">{data.author}</span> from
                the library.
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDialog(false)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksTable;