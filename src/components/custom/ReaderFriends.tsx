import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";

const readers = [
  {
    id: 1,
    name: "Roberto Jordan",
    avatar: "https://i.pravatar.cc/150?img=7",
    comment:
      "What a delightful and magical chapter it is! It indeed transports readers to the wizarding world.",
    chapter: "Chapter Five: Diagon Alley",
    time: "2 mins ago",
  },
  {
    id: 2,
    name: "Anna Henry",
    avatar: "",
    comment:
      "I finished reading the chapter last night and I enjoyed every moment of that!",
    chapter: "",
    time: "4 hours ago",
  },
];

export default function ReaderFriends() {
  return (
    <div className="space-y-4 mb-4 xl:mb-0">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair">Reader Friends</h2>
        <div className="flex gap-1">
          <div className="w-6 h-1 bg-black/10 hover:bg-black/50 rounded-full cursor-pointer duration-250"></div>
          <div className="w-6 h-1 bg-black/90 rounded-full cursor-pointer"></div>
        </div>
      </div>

      <div className="space-y-2">
        {readers.map((reader) => (
          <div key={reader.id} className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={reader.avatar} />
              <AvatarFallback>{reader.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{reader.name}</h3>
              <p className="text-sm text-foreground/80">{reader.comment}</p>
              {reader.chapter && (
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary" />
                  <span className="text-xs text-accent">{reader.chapter}</span>
                  <span className="text-xs text-foreground/50 ml-auto">
                    {reader.time}
                  </span>
                </div>
              )}
              {!reader.chapter && (
                <div className="text-right">
                  <span className="text-xs text-foreground/50">
                    {reader.time}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
