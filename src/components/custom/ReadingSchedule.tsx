"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const dates = [19, 20, 21, 22, 23, 24, 25];

export default function ReadingSchedule() {
  const [selectedDate, setSelectedDate] = useState(19);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair">Schedule Reading</h2>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            className="rounded-full border border-foreground/25"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
          <Button
            variant="ghost"
            className="rounded-full border border-foreground/25"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="flex flex-col items-center">
            <span className="text-sm text-foreground/70 mb-2">{day}</span>
            <button
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer
                ${
                  selectedDate === dates[index]
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-foreground/10"
                }
              `}
              onClick={() => setSelectedDate(dates[index])}
            >
              {dates[index]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
