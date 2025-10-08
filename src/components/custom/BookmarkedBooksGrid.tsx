import React from "react";
import { Book } from "@/lib/types";
import BookmarkedBookCard from "./BookmarkedBookCard";

const BooksGrid = ({ content }: { content: Book[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {content.map((book) => (
        <BookmarkedBookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

const BookmarkedBooksGrid = ({
  bookmarks,
  tab,
}: {
  bookmarks: Book[];
  tab: string;
}) => {
  const filteredBooks = bookmarks.filter((bookmark) => {
    if (tab === "recent") return bookmark.recent;
    if (tab === "favorites") return bookmark.favorite;
    return true;
  });

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No bookmarks found in this category.
      </div>
    );
  }

  return <BooksGrid content={filteredBooks} />;
};

export default BookmarkedBooksGrid;
