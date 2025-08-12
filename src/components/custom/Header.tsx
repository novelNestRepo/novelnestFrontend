import { Bell, LogOut } from "lucide-react";
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

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="relative">
        <input
          type="search"
          placeholder="Search book name, author, edition..."
          className="w-[300px] bg-foreground/5 border-none rounded-full p-4 pl-10 text-sm outline-none focus:ring-1 focus:ring-primary/30"
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

      <div className="flex items-center gap-4">
        <Link
          href="/voice-channels"
          className="text-sm font-medium text-primary hover:underline me-1"
        >
          Voice Channels
        </Link>
        <button className="text-foreground/70 hover:text-foreground">
          <Bell size={20} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="hover:bg-primary/8 active:bg-primary/8 p-2 rounded-4xl transition-all duration-100"
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium">me@email.com</span>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {"me@email.com".substring(0, 2).toUpperCase()}
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
            <DropdownMenuItem className="text-red-500 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div> */}
      </div>
    </header>
  );
}
