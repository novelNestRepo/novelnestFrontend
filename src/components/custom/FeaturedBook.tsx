import { Book } from "@/lib/types";
import Image from "next/image";
import React from "react";

const featuredBook: Book = {
  coverUrl:
    "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=1000",
  title: "Chamber of Secrets",
};

export default function FeaturedBook() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-playfair">Featured Book</h2>

      <div className="flex gap-4 justify-between">
        <div className="flex-3 space-y-1">
          <h2 className="text-lg font-playfair">The Chamber of Secrets</h2>
          <div className="flex items-center text-sm">
            <span className="text-accent font-medium">154</span>
            <span className="mx-1 text-foreground/50">/</span>
            <span className="text-foreground/50">300 pages</span>
          </div>
          <p className="text-foreground/75 text-sm">
            Harry as he returns to Hogwarts school of witchcraft and wizardry
            for his 2nd year, only to discover that...
          </p>
          <p className="text-right text-foreground/75 italic text-sm">
            - J.K. Rowling
          </p>
        </div>

        {featuredBook.coverUrl && (
          <Image
            src={featuredBook.coverUrl}
            alt={featuredBook.title || ""}
            className="flex-1 aspect-[2/3] object-cover rounded shadow max-w-[100px]"
            width="200"
            height="300"
          />
        )}
      </div>
    </div>
  );
}
