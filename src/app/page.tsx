import CurrentlyReading from "@/components/custom/CurrentlyReading";
import FeaturedBook from "@/components/custom/FeaturedBook";
import Header from "@/components/custom/Header";
import NewSeries from "@/components/custom/NewSeries";
import PopularBooks from "@/components/custom/PopularBooks";
import ReaderFriends from "@/components/custom/ReaderFriends";
import ReadingSchedule from "@/components/custom/ReadingSchedule";
import Sidebar from "@/components/custom/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f2e9] text-[#1a1a1a]">
      <Sidebar />

      <div className="ml-[68px]">
        <Header />

        <div className="flex p-8">
          <div className="flex-1 pr-10">
            <CurrentlyReading
              bookTitle="The Cambers of Secrets"
              readerName="Harvey"
              coverImage="/book-cover.jpg"
              description="Wow! you've delved deep into the wizarding world's secrets. Have Harry's parents died yet? Oops, looks like you're not there yet. Get reading now!"
            />

            <PopularBooks />
            <NewSeries />
          </div>

          <div className="w-[380px] border-l border-foreground/10 pl-10">
            <FeaturedBook />
            <ReadingSchedule />
            <ReaderFriends />
          </div>
        </div>
      </div>
    </div>
  );
}
