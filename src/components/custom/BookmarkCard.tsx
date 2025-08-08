import React from "react";
import { Card, CardContent } from "../ui/card";

type BookmarkCardsType = {
  title: string;
  author: string;
  coverUrl: string;
  pageNumber: number;
  dateBookmarked: string;
  note: string;
  favorite?: boolean;
};

const BookmarkCard = ({
  title,
  author,
  coverUrl,
  pageNumber,
  dateBookmarked,
  note,
  favorite = false,
}: BookmarkCardsType) => {
  return (
    <Card className="overflow-hidden p-4">
      <CardContent className="p-0 space-y-2">
        <div className="flex gap-3 p-0 h-36">
          <img
            src={coverUrl}
            alt={title}
            className="w-24 h-32 object-cover rounded-sm"
          />
          <div className="flex-1 space-y-2">
            <div className="space-y-0.5">
              <h3 className="font-medium line-clamp-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{author}</p>
            </div>
            <p className="text-xs italic text-muted-foreground">{note}</p>

            <div className="flex items-center mt-1">
              <span className="text-xs bg-primary/10 text-primary py-1 px-2 rounded-full">
                Page {pageNumber}
              </span>
              {favorite && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-0 py-0 rounded-full">
                  Favorite
                </span>
              )}
            </div>
          </div>
        </div>
        {note && (
          <p className="text-xs text-muted-foreground text-right">
            Bookmarked on {dateBookmarked}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookmarkCard;
