import { cn } from "@/lib/utils";
import Image from "next/image";

interface BookCardProps {
  coverUrl: string;
  title: string;
  series?: string;
  volume?: string;
  className?: string;
}

export default function BookCard({
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
        <Image
          src={coverUrl}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          width="200"
          height="300"
        ></Image>
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
