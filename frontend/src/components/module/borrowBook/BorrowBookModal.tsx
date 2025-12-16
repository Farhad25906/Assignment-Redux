import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useBorrowNewBookMutation } from "@/redux/api/baseApi";

interface BorrowBookModalProps {
  bookId: string;
  bookTitle: string;
  availableQuantity: number;
  trigger?: React.ReactNode;
}

// Zod validation schema
const borrowSchema = z.object({
  book: z.string(),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .int("Quantity must be a whole number"),
  dueDate: z.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
});

type BorrowFormData = z.infer<typeof borrowSchema>;

export function BorrowBookModal({
  bookId,
  bookTitle,
  availableQuantity,
  trigger,
}: BorrowBookModalProps) {
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [borrowBook, { isLoading }] = useBorrowNewBookMutation();
  const navigate = useNavigate();

  const form = useForm<BorrowFormData>({
    resolver: zodResolver(borrowSchema),
    defaultValues: {
      book: bookId,
      quantity: 1,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const onSubmit: SubmitHandler<BorrowFormData> = async (data) => {
    // Validate quantity doesn't exceed available copies
    if (data.quantity > availableQuantity) {
      toast.error(`Cannot borrow more than ${availableQuantity} copies`, {
        duration: 2000,
        position: "top-right",
      });
      return;
    }

    try {
      const borrowData = {
        ...data,
        book: bookId,
        dueDate: data.dueDate.toISOString(),
      };

      const res = await borrowBook(borrowData).unwrap();
      console.log("Book borrowed successfully:", res);

      toast.success("Book borrowed successfully!", {
        duration: 2000,
        position: "top-right",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });

      setOpen(false);
      form.reset();

      // Redirect to borrow summary page
      navigate("/borrow-summary");
    } catch (error: any) {
      console.error("Error borrowing book:", error);
      const errorMessage =
        error?.data?.message || "Failed to borrow book. Please try again.";
      toast.error(errorMessage, {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const selectedDueDate = form.watch("dueDate");
  const selectedQuantity = form.watch("quantity");

  // Generate calendar days
  const generateCalendar = () => {
    const today = new Date();
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleDateSelect = (date: Date) => {
    form.setValue("dueDate", date);
    setShowCalendar(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <div onClick={() => setOpen(true)}>{trigger}</div>

      {/* Custom Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/30 transition-all"
            onClick={() => !isLoading && setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10 animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => !isLoading && setOpen(false)}
              disabled={isLoading}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Borrow "{bookTitle}"
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Please provide the details for borrowing this book.
              </p>
            </div>

            {/* Content */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
              {/* Quantity Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  max={availableQuantity}
                  {...form.register("quantity", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b9be] focus:border-transparent"
                />
                {form.formState.errors.quantity && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.quantity.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {availableQuantity} {availableQuantity === 1 ? "copy" : "copies"} available
                </p>
              </div>

              {/* Due Date Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b9be] focus:border-transparent"
                >
                  <span className={selectedDueDate ? "text-gray-900" : "text-gray-400"}>
                    {selectedDueDate ? format(selectedDueDate, "PPP") : "Pick a date"}
                  </span>
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </button>
                {form.formState.errors.dueDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.dueDate.message}
                  </p>
                )}
                {selectedDueDate && (
                  <p className="text-sm text-gray-500 mt-1">
                    Book should be returned by {format(selectedDueDate, "PPP")}
                  </p>
                )}

                {/* Calendar Dropdown */}
                {showCalendar && (
                  <div className="mt-2 p-3 border border-gray-200 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-700 mb-2">
                      <div>Sun</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                    </div>
                    <div className="space-y-1">
                      {generateCalendar().map((date, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDateSelect(date)}
                          className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 ${
                            selectedDueDate &&
                            format(selectedDueDate, "yyyy-MM-dd") ===
                              format(date, "yyyy-MM-dd")
                              ? "bg-[#00b9be] text-white hover:bg-[#009ba0]"
                              : ""
                          }`}
                        >
                          {format(date, "MMM dd, yyyy")}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Validation Warning */}
              {selectedQuantity > availableQuantity && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">
                    Cannot borrow more than {availableQuantity} {availableQuantity === 1 ? "copy" : "copies"}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || selectedQuantity > availableQuantity}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#00b9be] hover:bg-[#009ba0] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Borrowing..." : "Borrow Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}