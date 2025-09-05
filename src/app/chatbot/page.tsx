import Chatbot from "@/components/custom/Chatbot";
import PageTitle from "@/components/custom/PageTitle";
import { MessageSquare } from "lucide-react";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <PageTitle title="Messages" icon={<MessageSquare />} />
        {/* <Select value={selectedChannel} onValueChange={setSelectedChannel}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a channel" />
      </SelectTrigger>
      <SelectContent>
        {channels.map((channel) => (
          <SelectItem key={channel.id} value={channel.id}>
            {channel.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select> */}
      </div>
      <Chatbot version="page" />
    </div>
  );
}
