import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";

const readers = [
  {
    id: 1,
    name: "Roberto Jordan",
    avatar: "https://i.pravatar.cc/150?img=68",
    comment:
      "What a delightful and magical chapter it is! It indeed transports readers to the wizarding world.",
    chapter: "Chapter Five: Diagon Alley",
    time: "2 min ago",
  },
  {
    id: 2,
    name: "Anna Henry",
    avatar: "https://i.pravatar.cc/150?img=47",
    comment:
      "I finished reading the chapter last night and I enjoyed every moment of that!",
    time: "4 hours ago",
  },
];

export default function ReaderFriends() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-playfair">Reader Friends</h2>
        <div className="flex space-x-1">
          <div className="w-6 h-1 bg-black/10 rounded-full"></div>
          <div className="w-6 h-1 bg-black/80 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-6">
        {readers.map((reader) => (
          <div key={reader.id} className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={reader.avatar} />
              <AvatarFallback>{reader.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h3 className="font-medium">{reader.name}</h3>
              <p className="text-sm text-foreground/80 mb-2">
                {reader.comment}
              </p>
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
