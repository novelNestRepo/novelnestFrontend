import Image from "next/image";
import React from "react";

export default function NewSeries() {
  return (
    <div className="space-y-4 xl:mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair">New Series Collection</h2>
        <div className="flex gap-1">
          <div className="w-6 h-1 bg-black/10 hover:bg-black/50 rounded-full cursor-pointer duration-250"></div>
          <div className="w-6 h-1 bg-black/90 rounded-full cursor-pointer"></div>
        </div>
      </div>

      <div className="bg-foreground/5 rounded p-4 flex items-center gap-2">
        <Image
          src="https://awoiaf.westeros.org/images/thumb/7/74/Manderly_knight_by_manzanedo.jpg/525px-Manderly_knight_by_manzanedo.jpg"
          alt="Book cover"
          className="aspect-[2/3] object-cover rounded shadow"
          width="100"
          height="300"
        />
        <div className="flex-1">
          <h3 className="font-medium mb-1">
            A Legend of Ice and Fire: The Ice Horse
          </h3>
          <div className="flex items-center text-sm">
            <span className="text-foreground/75">8 chapters each vol</span>
            <span className="ml-auto font-medium">2 vol</span>
          </div>
        </div>
      </div>
    </div>
  );
}
