"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageTitle from "@/components/custom/PageTitle";
import { MessagesSquare } from "lucide-react";

const VoiceChannels = () => {
  const [channels, setChannels] = useState([
    { id: "1", name: "General" },
    { id: "2", name: "Reading Club" },
    { id: "3", name: "Book Discussion" },
  ]);

  return (
    <>
      <PageTitle title="Voice Channels" icon={<MessagesSquare />} />
      <div className="grid gap-4">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{channel.name}</h3>
                <p className="text-sm text-gray-500">
                  Channel ID: {channel.id}
                </p>
              </div>
              <Button>
                <Link href={`/voice-channel/${channel.id}`}>Join Channel</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VoiceChannels;
