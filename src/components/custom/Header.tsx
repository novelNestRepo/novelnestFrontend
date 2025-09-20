"use client";

import { Bell, LogOut, Mic } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <Button
        className="lg:hidden rounded-full p-5"
        onClick={() => setSearchOpen((prev) => !prev)}
      >
        <svg
          className=""
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </Button>
      <div className="hidden lg:block relative w-[25%]">
        <input
          type="search"
          placeholder="Search book name, author, edition..."
          className="lg:w-full bg-foreground/5 border-none rounded-full p-4 pl-10 text-sm outline-none focus:ring-1 focus:ring-primary/30"
        />
        <svg
          className="absolute left-3 top-4.5 w-4 h-4 text-foreground/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="search"
        placeholder="Search book name, author, edition..."
        className={`${
          searchOpen ? "block" : "hidden"
        } bg-foreground/5 border-none rounded-full px-4 py-2.5 text-sm outline-none focus:none w-full ms-2`}
      />
      <div className={`${searchOpen ? "hidden" : ""} flex items-center`}>
        <Button variant="ghost" className="hidden lg:block">
          <Link
            href="/voice-channels"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voice Channels
          </Link>
        </Button>

        <Button variant="ghost" className="block lg:hidden">
          <Link href="/voice-channels" className="text-foreground/70">
            <Mic className="size-5" />
          </Link>
        </Button>

        <Button variant="ghost" className="text-2xl">
          <Bell className="size-5" />
        </Button>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="hover:bg-primary/8 active:bg-primary/8 p-2 rounded-4xl transition-all duration-100"
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm font-medium">{user?.email}</span>
                <Avatar>
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${user?.email}`}
                  />
                  <AvatarFallback>
                    {user?.email?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-full">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login" className="">
                Login
              </Link>
            </Button>
            <Button className="p-2 lg:p-4" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
