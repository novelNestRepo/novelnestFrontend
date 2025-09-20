import PopularBook from "./PopularBook";

const popularBooks = [
  {
    id: "1",
    title: "Fire & Blood",
    coverUrl: "https://georgerrmartin.com/images/FandB.jpg",
    description:
      "The thrilling history of House Targaryen in Westeros, chronicling their rise to power and the conquest of the Seven Kingdoms.",
  },
  {
    id: "2",
    title: "Ice & Fire",
    coverUrl:
      "http://www.multiversitycomics.com/wp-content/themes/mvc/images/timthumb.php?src=http://multiversitystatic.s3.amazonaws.com/uploads/2014/05/worldoficeandfire.jpg&q=95&w=593&zc=1&a=t",
    series: "Volume II",
    description:
      "An epic companion guide to the world of Westeros, featuring detailed maps, family histories, and lore from George R.R. Martin's universe.",
  },
  {
    id: "3",
    title: "Game of Thrones",
    coverUrl:
      "https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/agameofthrones_2024_tr_repackage-678x1024.jpg",
    series: "Volume III",
    description:
      "The first book in the epic fantasy series that launched a global phenomenon, introducing the deadly struggle for the Iron Throne.",
  },
  {
    id: "4",
    title: "The Wise Man's Fear",
    coverUrl:
      "https://georgerrmartin.com/notablog/wp-content/uploads/2024/07/astormofswords_2024_tr_repackage-678x1024.jpg",
    description:
      "The second installment in Patrick Rothfuss's Kingkiller Chronicle, following Kvothe's journey as he seeks knowledge and revenge.",
  },
];

export default function PopularBooks() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-playfair">Popular Now</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {popularBooks.map((book) => (
          <PopularBook key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
