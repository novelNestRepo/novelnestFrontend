import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Book } from "@/lib/types";

const LibraryBookCard = ({ book }: { book: Book }) => {
  return (
    <Card
      key={book.id}
      className="flex flex-col hover:ring-1 hover:ring-primary/30 gap-4 p-4 *:p-0"
    >
      <CardHeader>
        <div className="aspect-[2/3] relative overflow-hidden rounded-lg mb-4">
          {book.cover_url ? (
            <Image
              src={book.cover_url}
              alt={book.title || "Book cover"}
              className="object-cover w-full h-full"
              width="200"
              height="300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted pointer-events-none">
              <span className="text-sm text-muted-foreground">
                {book.title}
              </span>
            </div>
          )}
        </div>
        <CardTitle className="line-clamp-1">{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow !m-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {book.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground font-medium capitalize">
          {book.status ? book.status : "Unknown Status"}
        </span>
        <Button variant="link" className="cursor-pointer p-0">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LibraryBookCard;
