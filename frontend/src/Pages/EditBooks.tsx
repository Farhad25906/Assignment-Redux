import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useEditBookMutation, useGetBookByIdQuery } from "@/redux/api/baseApi";
import BookLoading from "@/components/layouts/BookLoading";
import toast from "react-hot-toast";

const EditBooks = () => {
  const { id } = useParams();
  const { data: bookData, isLoading: isBookLoading } = useGetBookByIdQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useEditBookMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 1,
      description: "",
      available: true,
    },
  });

  useEffect(() => {
    if (bookData?.data) {
      const book = bookData.data;
      console.log("Setting form with data:", book);

      form.reset({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "FICTION",
        isbn: book.isbn || "",
        copies: book.copies || 1,
        description: book.description || "",
        available: book.available ?? true,
      });
    }
  }, [bookData, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    try {
      console.log("Form data to submit:", formData);

      const bookUpdateData = {
        ...formData,
        copies: Number(formData.copies),
      };

      console.log("Sending update data:", { id, data: bookUpdateData });

      const res = await updateBook({
        id,
        updatedData: bookUpdateData,
      }).unwrap();
      toast.success("Book updated successfully", {
        duration: 2000,
        position: "top-right",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      navigate("/books");
      console.log("Book updated successfully:", res);
    } catch (error) {
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

  if (isBookLoading) {
    return <BookLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-6" style={{ backgroundColor: "#00b9be" }}>
            <h1 className="text-3xl font-bold text-white">Edit Book</h1>
            <p className="text-white/90 mt-2">
              Update book information in your collection
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 px-12 py-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter book title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ISBN number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="copies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copies</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Genre *</FormLabel>
                      <Select
                        value={field.value || "FICTION"}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FICTION">Fiction</SelectItem>
                          <SelectItem value="NON_FICTION">
                            Non-Fiction
                          </SelectItem>
                          <SelectItem value="SCIENCE">Science</SelectItem>
                          <SelectItem value="HISTORY">History</SelectItem>
                          <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                          <SelectItem value="FANTASY">Fantasy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Available for borrowing</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter book description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 w-full">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-1/2 bg-[#00b9be] hover:bg-[#009ba0]"
                >
                  {isUpdating ? "Updating..." : "Update Book"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="w-1/2"
                >
                  Reset Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditBooks;
