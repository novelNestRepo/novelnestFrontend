"use client";

import {
  Home,
  BookOpen,
  Clock,
  Bookmark,
  UserRound,
  Settings,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const SidebarItem = ({
  icon: Icon,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<any>;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all",
      active
        ? "bg-primary/20 text-primary"
        : "text-foreground/60 hover:text-foreground hover:bg-foreground/10"
    )}
  >
    <Icon size={22} />
  </button>
);

export default function Sidebar() {
  const router = useRouter();
  const path = usePathname();

  const getActiveItem = () => {
    if (path === "/") return "home";
    if (path.startsWith("/books")) return "books";
    if (path.startsWith("/history")) return "history";
    if (path.startsWith("/bookmarks")) return "bookmarks";
    if (path.startsWith("/messages")) return "messages";
    if (path.startsWith("/profile")) return "profile";
    if (path.startsWith("/settings")) return "settings";
    return "";
  };

  const home = () => router.push("/");
  const books = () => router.push("/books");
  const history = () => router.push("/history");
  const bookmarks = () => router.push("/bookmarks");
  const messages = () => router.push("/messages");
  const settings = () => router.push("/settings");

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[68px] flex flex-col items-center py-6 bg-background border-r border-border">
      <div className="mb-10">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.5 13.5C28.5 17.5 25.5 21 21 21C16.5 21 13.5 17.5 13.5 13.5C13.5 9.5 16.5 6 21 6C25.5 6 28.5 9.5 28.5 13.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21C16.5 21 7.5 23.25 7.5 30V33H34.5V30C34.5 23.25 25.5 21 21 21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col items-center flex-1">
        <SidebarItem
          icon={Home}
          active={getActiveItem() === "home"}
          onClick={home}
        />
        <SidebarItem
          icon={BookOpen}
          active={getActiveItem() === "books"}
          onClick={books}
        />
        <SidebarItem
          icon={Clock}
          active={getActiveItem() === "history"}
          onClick={history}
        />
        <SidebarItem
          icon={Bookmark}
          active={getActiveItem() === "bookmarks"}
          onClick={bookmarks}
        />
        <SidebarItem
          icon={MessageSquare}
          active={getActiveItem() === "messages"}
          onClick={messages}
        />
        <SidebarItem
          icon={UserRound}
          active={getActiveItem() === "profile"}
          onClick={() => router.push("/profile")}
        />
      </div>
      <div>
        <SidebarItem
          icon={Settings}
          active={getActiveItem() === "settings"}
          onClick={settings}
        />
      </div>
    </div>
  );
}
