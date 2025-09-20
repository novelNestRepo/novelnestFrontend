// bookTitle and coverImage?

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CurrentlyReadingProps {
  readerName: string;
  description: string;
}

export default function CurrentlyReading({
  readerName,
  description,
}: CurrentlyReadingProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-playfair font-medium">
        Happy reading, {readerName}!
      </h1>
      <p className="text-foreground/80">{description}</p>
      <Button className="rounded-full" size="lg">
        Start reading <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  );
}
