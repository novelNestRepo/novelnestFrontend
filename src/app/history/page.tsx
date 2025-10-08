// TODO: Handle dynamic data.
// TODO: Reponsive.

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import PageTitle from "@/components/custom/PageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ReadingHistory } from "@/lib/types";

const readingHistory: ReadingHistory[] = [
  {
    date: "2025-05-15",
    title: "The Midnight Library",
    pages_read: 12,
    time_spent: "45 minutes",
  },
  {
    date: "2025-05-14",
    title: "Fire & Blood",
    pages_read: 24,
    time_spent: "1 hour 20 minutes",
  },
  {
    date: "2025-05-14",
    title: "The Chambers of Secrets",
    pages_read: 8,
    time_spent: "30 minutes",
  },
  {
    date: "2025-05-13",
    title: "The Midnight Library",
    pages_read: 15,
    time_spent: "55 minutes",
  },
  {
    date: "2025-05-12",
    title: "Fire & Blood",
    pages_read: 18,
    time_spent: "1 hour",
  },
  {
    date: "2025-05-11",
    title: "The Chambers of Secrets",
    pages_read: 22,
    time_spent: "1 hour 10 minutes",
  },
  {
    date: "2025-05-10",
    title: "The Midnight Library",
    pages_read: 14,
    time_spent: "50 minutes",
  },
];

const History = () => {
  const [view, setView] = useState("timeline");

  return (
    <div className="pb-4">
      <PageTitle title="Reading History" icon={<Clock />} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-primary">18,456</h2>
            <p className="text-muted-foreground text-sm">Total minutes read</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-primary">52</h2>
            <p className="text-muted-foreground text-sm">Books completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-primary">245</h2>
            <p className="text-muted-foreground text-sm">Reading days streak</p>
          </CardContent>
        </Card>
      </div>

      {/* View Switcher */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Reading Stats</h2>
        <div className="bg-white rounded-lg border p-1 inline-flex">
          <button
            className={`px-3 py-1 text-sm rounded ${
              view === "timeline" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setView("timeline")}
          >
            Timeline
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              view === "stats" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setView("stats")}
          >
            Stats
          </button>
        </div>
      </div>

      {/* History Table */}
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white">
                <TableHead>Date</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Pages Read</TableHead>
                <TableHead>Time Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {readingHistory.map((book) => (
                <TableRow key={book.date}>
                  <TableCell className="font-medium">{book.date}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.pages_read} pages</TableCell>
                  <TableCell>{book.time_spent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="?page=1" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="?page=2">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="?page=3">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
