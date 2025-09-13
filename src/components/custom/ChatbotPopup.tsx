"use client";

import { BotMessageSquare } from "lucide-react";
import React, { useState } from "react";
import Chatbot from "./Chatbot";
import { usePathname } from "next/navigation";

const ChatbotPopup = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/chatbot") return null;
  return (
    <div className="relative">
      <button
        className="fixed rounded-full bg-primary hover:bg-accent w-[8vh] h-[8vh] bottom-[2.5vh] right-[2vh] z-50 flex justify-center items-center cursor-pointer duration-200"
        onClick={() => setChatbotOpen((prev) => !prev)}
      >
        <BotMessageSquare size="24" color="white" />
      </button>
      {chatbotOpen && (
        <div className="fixed bottom-[12.5vh] right-4 w-[25vw] h-[75vh]">
          <Chatbot version="popup" />
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
