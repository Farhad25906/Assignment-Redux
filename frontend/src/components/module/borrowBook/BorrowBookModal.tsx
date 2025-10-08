import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowNewBookMutation } from "@/redux/api/baseApi";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface BorrowBookModalProps {
  bookId: string;
  bookTitle: string;
  availableQuantity?: number;
  trigger?: React.ReactNode;
}

interface BorrowFormData {
  book: string;
  quantity: number;
  dueDate: Date;
}

export function BorrowBookModal({
  bookId,
  bookTitle,
  availableQuantity = 1,
  trigger,
}: BorrowBookModalProps) {
  const [open, setOpen] = useState(false);
  const [borrowBook, { isLoading, isError }] = useBorrowNewBookMutation();

  const form = useForm<BorrowFormData>({
    defaultValues: {
      book: bookId,
      quantity: 1,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const onSubmit: SubmitHandler<BorrowFormData> = async (data) => {
    try {
      const borrowData = {
        ...data,
        book: bookId,
        dueDate: data.dueDate.toISOString(),
      };

      const res = await borrowBook(borrowData).unwrap();
      console.log("Book borrowed successfully:", res);

      setOpen(false);
      form.reset({
        book: bookId,
        quantity: 1,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      toast.success("Book Borrowed successfully", {
        duration: 2000,
        position: "top-right",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error(`${error}`, {
        duration: 2000,
        position: "top-right",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };

  const selectedDueDate = form.watch("dueDate");
  const selectedQuantity = form.watch("quantity");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="default">Borrow Book</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow "{bookTitle}"</DialogTitle>
          <DialogDescription>
            Please provide the details for borrowing this book.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              rules={{
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
                max: {
                  value: availableQuantity,
                  message: `Cannot borrow more than ${availableQuantity} books`,
                },
                validate: {
                  isPositive: (value) =>
                    (Number.isInteger(value) && value > 0) ||
                    "Quantity must be a positive integer",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max={availableQuantity}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 1)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  {availableQuantity > 1 && (
                    <p className="text-sm text-muted-foreground">
                      {availableQuantity} books available
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              rules={{
                required: "Due date is required",
                validate: {
                  futureDate: (value) =>
                    value > new Date() || "Due date must be in the future",
                },
              }}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                  {selectedDueDate && (
                    <p className="text-sm text-muted-foreground">
                      Book should be returned by{" "}
                      {format(selectedDueDate, "PPP")}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="book"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className=" bg-[#00b9be] hover:bg-[#009ba0]"
                disabled={isLoading || selectedQuantity > availableQuantity}
              >
                {isLoading ? "Borrowing..." : "Borrow Book"}
              </Button>
            </DialogFooter>

            {isError && (
              <div className="text-sm text-destructive text-center">
                Failed to borrow book. Please try again.
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
