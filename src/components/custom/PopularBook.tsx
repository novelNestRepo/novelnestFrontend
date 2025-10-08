"use client";

import { useState } from "react";
import { Book } from "@/lib/types";
import Image from "next/image";

export default function PopularBook({ book }: { book: Book }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="space-y-2">
      <div className="relative w-full aspect-[2/3] overflow-hidden">
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
      <div className="space-y-1">
        <h3 className="font-medium text-sm line-clamp-2">{book.title}</h3>
        <p className="text-xs text-foreground/70">
          {book.series && <span>{book.series} </span>}
          {book.volume && <span>Volume {book.volume}</span>}
        </p>
      </div>
    </div>
  );
}
