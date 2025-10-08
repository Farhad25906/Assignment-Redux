import App from "@/App";
import AllBooks from "@/Pages/AllBooks";
import BorrowSummary from "@/Pages/BorrowSummary";
import { CreateBook } from "@/Pages/CreateBook";
import EditBooks from "@/Pages/EditBooks";
import HomePage from "@/Pages/HomePage";
import SingleBooks from "@/Pages/SingleBooks";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "create-book",
        Component: CreateBook,
      },
      {
        path: "books/:id",
        Component: SingleBooks,
      },
      {
        path: "edit-book/:id",
        Component: EditBooks,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
