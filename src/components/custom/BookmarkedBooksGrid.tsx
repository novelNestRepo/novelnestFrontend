import React from "react";
import { Book } from "@/lib/types";
import BooksGrid from "./BooksGrid";

const BookmarkedBooksGrid = ({
  bookmarks,
  tab,
}: {
  bookmarks: Book[];
  tab: string;
}) => {
  return (
    <>
      {tab === "all" && <BooksGrid content={bookmarks} />}
      {tab === "recent" && (
        <BooksGrid content={bookmarks.filter((bookmark) => bookmark.recent)} />
      )}
      {tab === "favorites" && (
        <BooksGrid
          content={bookmarks.filter((bookmark) => bookmark.favorite)}
        />
      )}
    </>
  );
};

export default BookmarkedBooksGrid;
