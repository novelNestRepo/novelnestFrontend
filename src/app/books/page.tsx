// TODO: Reponsive.

"use client";

import React, { useState } from "react";
import { Search, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PageTitle from "@/components/custom/PageTitle";
import { useBooks } from "@/lib/hooks/useBooks";

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const { books, isLoading, createBook, isCreating } = useBooks();

  const filteredBooks = books.filter(
    (book: any) =>
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <>
        <PageTitle title="Books" icon={<BookOpen />} />
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading books...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Books" icon={<BookOpen />} />

      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px] bg-foreground/5 border-none rounded py-2 px-4 pl-10 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary/30"
          />
        </div>
        <Button className="cursor-pointer" disabled={isCreating}>
          <Plus className="h-4 w-4" />
          {isCreating ? "Adding..." : "Add Book"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredBooks.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No books found
          </div>
        ) : (
          filteredBooks.map((book: any) => (
            <Card
              key={book.id}
              className="flex flex-col hover:ring-1 hover:ring-primary/30 gap-4 p-4 *:p-0"
            >
              <CardHeader>
                <div className="aspect-[2/3] relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={book.cover_url || book.coverUrl || "/placeholder-book.jpg"}
                    alt={book.title || "Book cover"}
                    className="object-cover w-full h-full"
                    width="200"
                    height="300"
                  />
                </div>
                <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {book.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-sm font-medium capitalize">
                  {book.status || "unknown"}
                </span>
                <Button variant="link" className="cursor-pointer p-0">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
