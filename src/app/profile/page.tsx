// TODO: Whole page 😅.

"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  User,
  BookMarked,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BookCardProps {
  coverUrl: string;
  title: string;
  series?: string;
  volume?: string;
  className?: string;
}

export function BookCard({
  coverUrl,
  title,
  series,
  volume,
  className,
}: BookCardProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className="relative overflow-hidden rounded-md shadow-md"
        style={{ aspectRatio: "2/3" }}
      >
        <img
          src={coverUrl}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="text-left">
        <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
        {(series || volume) && (
          <p className="text-xs text-foreground/70">
            {series && <span>{series} </span>}
            {volume && <span>Volume {volume}</span>}
          </p>
        )}
      </div>
    </div>
  );
}

const books = [
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

const Profile = () => {
  const [activeTab, setActiveTab] = useState("currently-reading");

  return (
    <>
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
        <Avatar className="h-24 w-24 border-2 border-primary">
          <AvatarImage
            src="/lovable-uploads/9af4a8ff-22ee-48aa-b0b3-aac48aed7f1f.png"
            alt="Youssef Ali"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-xl">
            YA
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-serif font-medium">Youssef Ali</h1>
          <p className="text-muted-foreground mt-1">
            Book enthusiast • 52 books read this year
          </p>
          <div className="flex gap-4 mt-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings size={16} />
              <span>Edit Profile</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Users size={16} />
              <span>Friends</span>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm w-full md:w-auto">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-2xl font-medium">52</p>
              <p className="text-muted-foreground text-sm">Books Read</p>
            </div>
            <div className="text-center border-x border-muted/30 px-4">
              <p className="text-2xl font-medium">267</p>
              <p className="text-muted-foreground text-sm">Following</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-medium">18K</p>
              <p className="text-muted-foreground text-sm">Minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Goals */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-medium mb-4">2025 Reading Challenge</h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span>52 of 75 books</span>
              <span className="text-primary">69%</span>
            </div>
            <Progress value={69} className="h-2" />
            <p className="text-muted-foreground text-sm mt-2">
              23 books left to reach your goal
            </p>
          </div>

          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span>18,456 of 25,000 minutes</span>
              <span className="text-primary">74%</span>
            </div>
            <Progress value={74} className="h-2" />
            <p className="text-muted-foreground text-sm mt-2">
              6,544 minutes left to reach your goal
            </p>
          </div>
        </div>
      </div>

      {/* Book Tabs */}
      <Tabs
        defaultValue="currently-reading"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-medium">My Books</h2>
          <TabsList>
            <TabsTrigger value="currently-reading">Reading</TabsTrigger>
            <TabsTrigger value="want-to-read">Want to Read</TabsTrigger>
            <TabsTrigger value="read">Finished</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="currently-reading">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BookCard
              title="The Cambers of Secrets"
              author="J.K. Rowling"
              coverUrl="https://m.media-amazon.com/images/I/71FpjDxKakL._AC_UF1000,1000_QL80_.jpg"
              progress={52}
              totalPages={341}
            />
            <BookCard
              title="Fire & Blood"
              author="George R.R. Martin"
              coverUrl="https://m.media-amazon.com/images/I/91tfL1M9+HL._AC_UF1000,1000_QL80_.jpg"
              progress={126}
              totalPages={736}
            />
            <BookCard
              title="The Midnight Library"
              author="Matt Haig"
              coverUrl="https://m.media-amazon.com/images/I/81t-Lc-u3cL._AC_UF1000,1000_QL80_.jpg"
              progress={89}
              totalPages={304}
            />
          </div>
        </TabsContent>

        <TabsContent value="want-to-read">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BookCard
              title="The World of Ice & Fire"
              author="George R.R. Martin"
              coverUrl="https://m.media-amazon.com/images/I/91pL+qAIpHL._AC_UF1000,1000_QL80_.jpg"
              waitlist={true}
            />
            <BookCard
              title="A Storm of Swords"
              author="George R.R. Martin"
              coverUrl="https://m.media-amazon.com/images/I/91qZJ+h+12L._AC_UF1000,1000_QL80_.jpg"
              waitlist={true}
            />
            <BookCard
              title="Project Hail Mary"
              author="Andy Weir"
              coverUrl="https://m.media-amazon.com/images/I/91vS2L5YfEL._AC_UF1000,1000_QL80_.jpg"
              waitlist={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="read">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BookCard
              title="The Philosopher's Stone"
              author="J.K. Rowling"
              coverUrl="https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_UF1000,1000_QL80_.jpg"
              completed={true}
              rating={5}
            />
            <BookCard
              title="A Game of Thrones"
              author="George R.R. Martin"
              coverUrl="https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_UF1000,1000_QL80_.jpg"
              completed={true}
              rating={4}
            />
            <BookCard
              title="The Hobbit"
              author="J.R.R. Tolkien"
              coverUrl="https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg"
              completed={true}
              rating={5}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Reading Activity */}
      <section className="mt-10">
        <h2 className="text-xl font-serif font-medium mb-4">Recent Activity</h2>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex gap-4">
              <div className="bg-primary/10 rounded-full p-2 h-min">
                <BookOpen size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  Started reading "The Midnight Library"
                </p>
                <p className="text-muted-foreground text-sm">2 days ago</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex gap-4">
              <div className="bg-primary/10 rounded-full p-2 h-min">
                <BookMarked size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  Finished reading "The Philosopher's Stone"
                </p>
                <p className="text-muted-foreground text-sm">5 days ago</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex gap-4">
              <div className="bg-primary/10 rounded-full p-2 h-min">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Read for 45 minutes</p>
                <p className="text-muted-foreground text-sm">Yesterday</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Profile;
