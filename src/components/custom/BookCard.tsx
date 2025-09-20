"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Partial<Book> }) {
  return (
    <Card className="overflow-hidden p-4">
      <CardContent className="p-0 space-y-2">
        <div className="flex gap-3 p-0 h-36">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={book.title || ""}
              className="w-24 h-36 object-cover rounded"
              width="96"
              height="144"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target
                  .parentElement!.querySelector(".fallback-cover")!
                  .classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={`fallback-cover w-24 h-36 bg-gray-200 rounded flex items-center justify-center ${
              book.coverUrl ? "hidden" : ""
            }`}
          >
            <div className="text-gray-400 text-2xl font-bold">📚</div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="space-y-0.5">
              <h3 className="font-medium line-clamp-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <p className="text-sm text-muted-foreground line-clamp-5">
                {book.description}
              </p>
            </div>
            <p className="text-xs italic text-muted-foreground">{book.note}</p>

            <div className="flex items-center mt-1">
              {book.pageNumber && (
                <span className="text-xs bg-primary/10 text-primary py-1 px-2 rounded-2xl">
                  Page {book.pageNumber}
                </span>
              )}
              {book.favorite && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-0 py-0 rounded-full">
                  Favorite
                </span>
              )}
            </div>
          </div>
        </div>
        {book.note && (
          <p className="text-xs text-muted-foreground text-right">
            Bookmarked on {book.dateBookmarked?.toString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
