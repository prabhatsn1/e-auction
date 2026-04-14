"use client";

import { useEffect, useState } from "react";

interface AuctionTimerProps {
  endTime: Date;
  compact?: boolean;
}

export const AuctionTimer = ({ endTime, compact = true }: AuctionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const distance = new Date(endTime).getTime() - Date.now();
      if (distance <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  if (compact) {
    const { days, hours, minutes, seconds } = timeLeft;
    const isUrgent = days === 0 && hours < 2;
    return (
      <span
        className={`font-mono text-xs font-semibold ${isUrgent ? "text-red-500" : "text-foreground"}`}
      >
        {days > 0 ? `${days}d ` : ""}
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2">
      {units.map(({ label, value }) => (
        <div key={label} className="min-w-[44px] rounded-lg bg-accent px-2.5 py-1.5 text-center">
          <span className="block text-sm font-bold">{String(value).padStart(2, "0")}</span>
          <span className="text-[10px] text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
};
