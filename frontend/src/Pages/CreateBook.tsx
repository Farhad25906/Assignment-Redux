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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

// Zod validation schema
const bookSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  author: z.string().min(1, "Author is required").max(100, "Author name is too long"),
  genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], {
    required_error: "Please select a genre",
  }),
  isbn: z.string().min(10, "ISBN must be at least 10 characters").max(13, "ISBN must not exceed 13 characters"),
  copies: z.number().min(1, "At least 1 copy is required").int("Copies must be a whole number"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description is too long"),
  available: z.boolean(),
});

type BookFormValues = z.infer<typeof bookSchema>;

export function CreateBook() {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();
  
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      copies: 1,
      description: "",
      available: true,
    },
  });

  const onSubmit = async (data: BookFormValues) => {
    try {
      const res = await createBook(data).unwrap();
      console.log("Book created successfully:", res);
      toast.success("Book Added successfully!", {
        duration: 2000,
        position: "top-right",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      form.reset();
      // Redirect to /books after successful submission
      navigate("/books");
    } catch (error) {
      console.error("Error creating book:", error);
      toast.error("Failed to create book. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

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
                        <Input
                          placeholder="Enter book title"
                          {...field}
                        />
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
                        <Input
                          placeholder="Enter author name"
                          {...field}
                        />
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
                        <Input
                          placeholder="Enter ISBN number"
                          {...field}
                        />
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
                      <FormLabel>Copies *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
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
                  disabled={isLoading}
                  className="w-1/2 bg-[#00b9be] hover:bg-[#009da1]"
                >
                  {isLoading ? "Creating..." : "Create Book"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="w-1/2"
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}