"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setShowColon((prev) => !prev);
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12 || 12; // Convert 24h to 12h format
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const period = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="text-gray-700 font-medium flex items-center">
      <span>{hours}</span>
      <span
        className={`mx-0.5 inline-flex items-center translate-y-[-1px] ${
          showColon ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100`}
      >
        :
      </span>
      <span>{minutes}</span>
      <span className="ml-1">{period}</span>
    </div>
  );
}
