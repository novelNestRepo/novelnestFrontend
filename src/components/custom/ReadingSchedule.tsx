"use client";

import { useState } from "react";

const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const dates = [19, 20, 21, 22, 23, 24, 25];

export default function ReadingSchedule() {
  const [selectedDate, setSelectedDate] = useState(19);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-playfair">Schedule Reading</h2>
        <div className="flex space-x-2">
          <button className="p-1 rounded-full border border-foreground/20">
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
          </button>
          <button className="p-1 rounded-full border border-foreground/20">
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
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="flex flex-col items-center">
            <span className="text-sm text-foreground/70 mb-2">{day}</span>
            <button
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
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
