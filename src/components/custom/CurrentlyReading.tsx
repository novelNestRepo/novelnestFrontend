// bookTitle and coverImage?

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CurrentlyReadingProps {
  bookTitle: string;
  readerName: string;
  coverImage: string;
  description: string;
}

export default function CurrentlyReading({
  bookTitle,
  readerName,
  coverImage,
  description,
}: CurrentlyReadingProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-playfair font-medium mb-1">
        Happy reading,
        <br />
        {readerName}
      </h1>
      <p className="text-foreground/80 mb-6 max-w-md">{description}</p>
      <Button className="rounded-full !px-6 !py-5 cursor-pointer">
        Start reading <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  );
}
