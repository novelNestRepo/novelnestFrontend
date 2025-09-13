"use client";

import {
  Home,
  BookOpen,
  Clock,
  Bookmark,
  UserRound,
  Settings,
  BotMessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
      "flex items-center justify-center w-12 h-12 rounded-full mt-4 transition-all cursor-pointer",
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
    if (path.startsWith("/chatbot")) return "chatbot";
    if (path.startsWith("/profile")) return "profile";
    if (path.startsWith("/settings")) return "settings";
    return "";
  };

  const home = () => router.push("/");
  const books = () => router.push("/books");
  const history = () => router.push("/history");
  const bookmarks = () => router.push("/bookmarks");
  const chatbot = () => router.push("/chatbot");
  const settings = () => router.push("/settings");

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[96px] flex flex-col items-center justify-center py-4 bg-background border-r border-border">
      <Link href="/">
        <Image
          src="/novelnest.png"
          width="64"
          height="64"
          alt="Logo"
          className="cursor-pointer"
        />
      </Link>
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
          icon={BotMessageSquare}
          active={getActiveItem() === "chatbot"}
          onClick={chatbot}
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
