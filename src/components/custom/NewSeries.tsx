import Image from "next/image";
import React from "react";

export default function NewSeries() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-playfair">New Series Collection</h2>
        <div className="flex space-x-1">
          <div className="w-6 h-1 bg-black/10 rounded-full"></div>
          <div className="w-6 h-1 bg-black/80 rounded-full"></div>
        </div>
      </div>

      <div className="bg-foreground/5 rounded-lg p-4 flex items-center gap-4">
        <div className="w-24 h-32 flex-shrink-0">
          <Image
            src="https://awoiaf.westeros.org/images/thumb/7/74/Manderly_knight_by_manzanedo.jpg/525px-Manderly_knight_by_manzanedo.jpg"
            alt="Book cover"
            className="w-full h-full object-cover rounded shadow"
            width="200"
            height="300"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium mb-1">
            A Legend of Ice and Fire: The Ice Horse
          </h3>
          <div className="flex items-center text-sm">
            <span className="text-foreground/70">8 chapters each vol</span>
            <span className="ml-auto font-medium">2 vol</span>
          </div>
        </div>
      </div>
    </div>
  );
}
