export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  description: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IBorrowBook {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}
