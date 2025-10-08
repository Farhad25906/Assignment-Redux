import BooksTable from "@/components/module/book/BooksTable";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/type";
import BookLoading from "@/components/layouts/BookLoading";
import EmptyState from "@/components/layouts/EmptyState";
import ErrorComponent from "@/components/layouts/ErrorComponent";

const AllBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  if (isLoading) return <BookLoading />;

  if (isError) return <ErrorComponent />;

  if (!data || !data.data || data.data.length === 0) return <EmptyState />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-6" style={{ backgroundColor: "#00b9be" }}>
            <h1 className="text-3xl font-bold text-white">
              Book Library Management
            </h1>
            <p className="text-white/90 mt-2">
              Manage your book collection efficiently
            </p>
          </div>

          <div className="overflow-x-auto px-12 py-6">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Title</TableHead>
                  <TableHead className="font-bold">Author</TableHead>
                  <TableHead className="font-bold">Genre</TableHead>
                  <TableHead className="font-bold ">ISBN</TableHead>
                  <TableHead className="font-bold">Copies</TableHead>
                  <TableHead className="font-bold">Available</TableHead>
                  <TableHead className="text-center font-bold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((book: IBook) => (
                  <BooksTable data={book} key={book._id} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
