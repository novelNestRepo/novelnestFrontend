import React from "react";
import { Book } from "@/lib/types";
import LibraryBookCard from "./LibraryBookCard";

const BooksGrid = ({ content }: { content: Book[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {content.map((book) => (
        <LibraryBookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

const ProfileBooksGrid = ({ books, tab }: { books: Book[]; tab: string }) => {
  const filteredBooks = books.filter((book) => book.status === tab);

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No books in this category yet.
      </div>
    );
  }

  return <BooksGrid content={filteredBooks} />;
};

export default ProfileBooksGrid;
