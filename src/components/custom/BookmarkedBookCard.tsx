"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Book } from "@/lib/types";
import { useState } from "react";

export default function BookmarkedBookCard({ book }: { book: Partial<Book> }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden p-4 h-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="flex gap-2 p-0 flex-grow">
          <div className="relative w-[40%] aspect-[2/3] overflow-hidden shrink-0">
            {book.cover_url && !imageError ? (
              <Image
                src={book.cover_url}
                alt={book.title || "Book cover"}
                className="object-cover w-full h-full rounded"
                width="200"
                height="300"
                onError={handleImageError}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted pointer-events-none border-2 rounded">
                <span className="text-sm text-muted-foreground">📚</span>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="font-medium line-clamp-2">{book.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {book.author}
            </p>
            {book.note && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                "{book.note}"
              </p>
            )}
            <div className="mt-auto pt-2">
              <div className="flex gap-2 flex-wrap">
                {book.pageNumber && (
                  <span className="text-xs bg-primary/10 text-primary py-1 px-2 rounded-2xl">
                    Page {book.pageNumber}
                  </span>
                )}
                {book.favorite && (
                  <span className="text-xs bg-amber-100 text-amber-700 py-1 px-2 rounded-2xl">
                    Favorite
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Bookmarked on {book.dateBookmarked?.toString()}
        </p>
      </CardContent>
    </Card>
  );
}
