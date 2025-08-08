// TODO: Responsive.
// TODO: Dynamic Data.

"use client";

import BookmarksGrid from "@/components/custom/BookmarksGrid";
import PageTitle from "@/components/custom/PageTitle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [activeTab, setActiveTab] = useState("all");

  const bookmarks = [
    {
      id: 1,
      title: "The Adventures of Sherlock Holmes",
      author: "Arthur Conan Doyle",
      coverUrl: "https://m.media-amazon.com/images/I/71tvs98+5vL.jpg",
      pageNumber: 143,
      dateBookmarked: "May 10, 2025",
      note: "The part where Holmes deduces the client's profession just from a hat",
      favorite: true,
    },
    {
      id: 2,
      title: "Fire & Blood",
      author: "George R.R. Martin",
      coverUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c2/Fire_%26_Blood_%282018%29_hardcover.jpg",
      pageNumber: 267,
      dateBookmarked: "May 8, 2025",
      note: "Aegon's conquest of Westeros",
      recent: true,
    },
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      coverUrl:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
      pageNumber: 89,
      dateBookmarked: "May 5, 2025",
      note: "When Nora first enters the Midnight Library",
      favorite: true,
    },
    {
      id: 4,
      title: "The Philosopher's Stone",
      author: "J.K. Rowling",
      coverUrl:
        "https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_UF1000,1000_QL80_.jpg",
      pageNumber: 112,
      dateBookmarked: "April 29, 2025",
      note: "Harry's first Quidditch match",
      recent: true,
    },
    {
      id: 5,
      title: "A Game of Thrones",
      author: "George R.R. Martin",
      coverUrl:
        "https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_UF1000,1000_QL80_.jpg",
      pageNumber: 211,
      dateBookmarked: "April 25, 2025",
      note: "Ned Stark discovers the truth about the royal children",
    },
    {
      id: 6,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      coverUrl:
        "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
      pageNumber: 86,
      dateBookmarked: "April 20, 2025",
      note: "Riddles in the dark with Gollum",
    },
  ];
  return (
    <>
      <PageTitle title="Bookmarks" icon={<Bookmark />} />
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Save your favorite pages and chapters for quick access.
          </p>
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="all">
              All
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="recent">
              Recent
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="favorites">
              Favorites
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <BookmarksGrid bookmarks={bookmarks} tab="all" />
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>

        <TabsContent value="recent">
          <BookmarksGrid bookmarks={bookmarks} tab="recent" />
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>

        <TabsContent value="favorites">
          <BookmarksGrid bookmarks={bookmarks} tab="favorites" />
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default page;
