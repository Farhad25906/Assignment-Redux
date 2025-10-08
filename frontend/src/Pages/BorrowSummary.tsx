import { useGetAllBorrowBooksQuery } from "@/redux/api/baseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { IBorrowBook } from "@/type";
import BookLoading from "@/components/layouts/BookLoading";
import ErrorComponent from "@/components/layouts/ErrorComponent";
import EmptyState from "@/components/layouts/EmptyState";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetAllBorrowBooksQuery(undefined);

  if (isLoading) return <BookLoading />;

  if (isError) return <ErrorComponent />;

  if (!data || !data.data || data.data.length === 0) return <EmptyState />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-6" style={{ backgroundColor: "#00b9be" }}>
            <h1 className="text-3xl font-bold text-white">Borrow Summary</h1>
            <p className="text-white/90 mt-2">
              Overview of borrowed books and quantities
            </p>
          </div>

          <div className="overflow-x-auto px-12 py-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Title</TableHead>
                  <TableHead className="font-bold">ISBN</TableHead>
                  <TableHead className="font-bold text-center">
                    Total Quantity
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((item: IBorrowBook, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {item.book?.title || "N/A"}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-gray-600">
                      {item.book?.isbn || "N/A"}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {item.totalQuantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;
