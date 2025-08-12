import React from "react";
import { Book } from "@/lib/types";
import BookCard from "./BookCard";

const ProfileBooksGrid = ({ content }: { content: Book[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {content.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          coverUrl={book.coverUrl}
          pageNumber={book.pageNumber}
          dateBookmarked={book.dateBookmarked}
          note={book.note}
          description={book.description}
        />
      ))}
    </div>
  );
};

export default ProfileBooksGrid;
