import { TableRow, TableCell } from "@/components/ui/table";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import type { IBook } from "@/type";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { BorrowBookModal } from "../borrowBook/BorrowBookModal";

interface BooksTableProps {
  data: IBook;
}

const BooksTable = ({ data }: BooksTableProps) => {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = (id: string) => {
    deleteBook(id);
    toast.success("Book deleted successfully!", {
      duration: 2000,
      position: "top-right",
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  return (
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
            title="Edit Book"
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
          <Button
            onClick={() => handleDelete(data._id)}
            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 hover:scale-105"
            title="Delete Book"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BooksTable;
