import React from "react";

export default function FeaturedBook() {
  return (
    <div className="mb-8">
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-playfair">Featured Book</h2>
        <h2 className="text-lg font-playfair">The Chamber of Secrets</h2>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex-3 text-sm">
          <div className="flex items-center mb-4">
            <span className="text-accent font-medium">154</span>
            <span className="mx-1 text-foreground/50">/</span>
            <span className="text-foreground/50">300 pages</span>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-4">
            Harry as he returns to Hogwarts school of witchcraft and wizardry
            for his 2nd year, only to discover that...
          </p>

          <p className="text-right text-foreground/70 italic">- J.K. Rowling</p>
        </div>

        <div className="flex-2 relative">
          <img
            src="https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=1000"
            alt="Open book"
            className="w-full h-full object-cover rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
