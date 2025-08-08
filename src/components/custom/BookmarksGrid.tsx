import React from "react";
import BookmarkCard from "./BookmarkCard";

const BookmarksGrid = ({ bookmarks, tab }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tab === "all" &&
        bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            title={bookmark.title}
            author={bookmark.author}
            coverUrl={bookmark.coverUrl}
            pageNumber={bookmark.pageNumber}
            dateBookmarked={bookmark.dateBookmarked}
            note={bookmark.note}
          />
        ))}
      {tab === "recent" &&
        bookmarks
          .filter((bookmark) => bookmark.recent)
          .map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              title={bookmark.title}
              author={bookmark.author}
              coverUrl={bookmark.coverUrl}
              pageNumber={bookmark.pageNumber}
              dateBookmarked={bookmark.dateBookmarked}
              note={bookmark.note}
            />
          ))}
      {tab === "favorites" &&
        bookmarks
          .filter((bookmark) => bookmark.favorite)
          .map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              title={bookmark.title}
              author={bookmark.author}
              coverUrl={bookmark.coverUrl}
              pageNumber={bookmark.pageNumber}
              dateBookmarked={bookmark.dateBookmarked}
              note={bookmark.note}
            />
          ))}
    </div>
  );
};

export default BookmarksGrid;
