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

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  status: "reading" | "completed" | "to-read";
}

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover:
        "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
      description:
        "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
      status: "reading",
    },
  ]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredBooks.map((book) => (
          <Card
            key={book.id}
            className="flex flex-col hover:ring-1 hover:ring-primary/30 gap-4 p-4 *:p-0"
          >
            <CardHeader>
              <div className="aspect-[2/3] relative overflow-hidden rounded-lg mb-4">
                <Image
                  src={book.cover}
                  alt={book.title}
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
                {book.status}
              </span>
              <Button variant="link" className="cursor-pointer p-0">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
