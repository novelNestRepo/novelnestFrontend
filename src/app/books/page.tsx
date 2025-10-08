// TODO: Reponsive.

"use client";

import React, { useState } from "react";
import { Search, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/custom/PageTitle";
import { useBooks } from "@/lib/hooks/useBooks";
import LibraryBookCard from "@/components/custom/LibraryBookCard";

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  // const { books, isLoading, createBook, isCreating } = useBooks();

  const books = [
    {
      id: "1",
      title: "Fire & Blood",
      author: "George R.R. Martin",
      cover_url: "",
      description:
        "The thrilling history of House Targaryen in Westeros, chronicling their rise to power and the conquest of the Seven Kingdoms.",
    },
    {
      id: "2",
      title: "The World of Ice & Fire",
      author: "George R.R. Martin",
      cover_url:
        "http://www.multiversitycomics.com/wp-content/themes/mvc/images/timthumb.php?src=http://multiversitystatic.s3.amazonaws.com/uploads/2014/05/worldoficeandfire.jpg&q=95&w=593&zc=1&a=t",
      series: "Volume II",
      description:
        "An epic companion guide to the world of Westeros, featuring detailed maps, family histories, and lore from George R.R. Martin's universe.",
    },
    {
      id: "3",
      title: "A Game of Thrones",
      author: "George R.R. Martin",
      cover_url:
        "https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/agameofthrones_2024_tr_repackage-678x1024.jpg",
      series: "A Song of Ice and Fire",
      description:
        "The first book in the epic fantasy series that launched a global phenomenon, introducing the deadly struggle for the Iron Throne.",
    },
    {
      id: "4",
      title: "The Wise Man's Fear",
      author: "Patrick Rothfuss",
      cover_url:
        "https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/astormofswords_2024_tr_repackage-678x1024.jpg",
      description:
        "The second installment in Patrick Rothfuss's Kingkiller Chronicle, following Kvothe's journey as he seeks knowledge and revenge.",
    },
  ];

  const isLoading = false;
  const isCreating = false;

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
    <div className="pb-4">
      <PageTitle title="Books" icon={<BookOpen />} />
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full lg:w-[25%] me-2 lg:me-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-foreground/5 border-none rounded py-2 px-4 pl-10 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary/30"
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
            <LibraryBookCard key={book.id} book={book} />
          ))
        )}
      </div>
    </div>
  );
}
