// TODO: Handle Dynamic Data.
// TODO: Responsive.

import CurrentlyReading from "@/components/custom/CurrentlyReading";
import FeaturedBook from "@/components/custom/FeaturedBook";
import NewSeries from "@/components/custom/NewSeries";
import PopularBooks from "@/components/custom/PopularBooks";
import ReaderFriends from "@/components/custom/ReaderFriends";
import ReadingSchedule from "@/components/custom/ReadingSchedule";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex-3/4 pr-10">
        <CurrentlyReading
          bookTitle="The Cambers of Secrets"
          readerName="Harvey"
          coverImage="/book-cover.jpg"
          description="Wow! you've delved deep into the wizarding world's secrets. Have Harry's parents died yet? Oops, looks like you're not there yet. Get reading now!"
        />
        <PopularBooks />
        <NewSeries />
      </div>

      <div className="flex-1/4 border-l border-foreground/10 pl-10">
        <FeaturedBook />
        <ReadingSchedule />
        <ReaderFriends />
      </div>
    </div>
  );
}
