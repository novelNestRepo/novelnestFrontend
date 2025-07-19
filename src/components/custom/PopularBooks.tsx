import BookCard from "@/components/custom/BookCard";

const popularBooks = [
  {
    id: 1,
    title: "Fire & Blood",
    coverUrl: "https://georgerrmartin.com/images/FandB.jpg",
  },
  {
    id: 2,
    title: "Ice & Fire",
    coverUrl:
      "http://www.multiversitycomics.com/wp-content/themes/mvc/images/timthumb.php?src=http://multiversitystatic.s3.amazonaws.com/uploads/2014/05/worldoficeandfire.jpg&q=95&w=593&zc=1&a=t",
    series: "Volume II",
  },
  {
    id: 3,
    title: "Game of Thrones",
    coverUrl:
      "https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/agameofthrones_2024_tr_repackage-678x1024.jpg",
    series: "Volume III",
  },
  {
    id: 4,
    title: "The Wise Man's Fear",
    coverUrl:
      "https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/astormofswords_2024_tr_repackage-678x1024.jpg",
  },
];

export default function PopularBooks() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-playfair">Popular Now</h2>
        <div className="flex space-x-1">
          <div className="w-6 h-1 bg-black/10 rounded-full"></div>
          <div className="w-6 h-1 bg-black/80 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {popularBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            coverUrl={book.coverUrl}
            series={book.series}
          />
        ))}
      </div>
    </div>
  );
}
