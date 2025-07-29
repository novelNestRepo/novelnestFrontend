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

const History = () => {
  const [view, setView] = useState("timeline");

  return (
    <>
      <PageTitle title="Reading History" icon={<Clock />} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
              <TableRow>
                <TableCell className="font-medium">May 15, 2025</TableCell>
                <TableCell>The Midnight Library</TableCell>
                <TableCell>12 pages</TableCell>
                <TableCell>45 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">May 14, 2025</TableCell>
                <TableCell>Fire & Blood</TableCell>
                <TableCell>24 pages</TableCell>
                <TableCell>1 hour 20 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">May 14, 2025</TableCell>
                <TableCell>The Chambers of Secrets</TableCell>
                <TableCell>8 pages</TableCell>
                <TableCell>30 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">May 13, 2025</TableCell>
                <TableCell>The Midnight Library</TableCell>
                <TableCell>15 pages</TableCell>
                <TableCell>55 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">May 12, 2025</TableCell>
                <TableCell>Fire & Blood</TableCell>
                <TableCell>18 pages</TableCell>
                <TableCell>1 hour</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">May 11, 2025</TableCell>
                <TableCell>The Chambers of Secrets</TableCell>
                <TableCell>22 pages</TableCell>
                <TableCell>1 hour 10 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">May 10, 2025</TableCell>
                <TableCell>The Midnight Library</TableCell>
                <TableCell>14 pages</TableCell>
                <TableCell>50 minutes</TableCell>
              </TableRow>
            </TableBody>
          </Table>

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
        </CardContent>
      </Card>
    </>
  );
};

export default History;
