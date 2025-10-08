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
        className="fixed rounded-full bg-primary hover:bg-accent w-16 h-16 bottom-4 right-4 z-50 flex justify-center items-center cursor-pointer duration-200"
        onClick={() => setChatbotOpen((prev) => !prev)}
      >
        <BotMessageSquare className="w-8 h-8" color="white" />
      </button>
      {chatbotOpen && (
        <div className="fixed bottom-24 right-4 w-[75%] h-[75%] lg:w-[25%] lg:h-[75%]">
          <Chatbot version="popup" />
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
