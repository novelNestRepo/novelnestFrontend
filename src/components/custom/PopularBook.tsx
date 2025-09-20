"use client";

import React from "react";
import { Book } from "@/lib/types";
import Image from "next/image";

export default function PopularBook({ book }: { book: Book }) {
  return (
    <div className="space-y-2">
      {book.coverUrl ? (
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded">
          <Image
            src={book.coverUrl}
            alt={book.title || ""}
            className="absolute object-cover hover:scale-105 duration-250"
            fill
          />
        </div>
      ) : null}
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
