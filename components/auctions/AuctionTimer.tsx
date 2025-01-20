import { useEffect, useState } from "react";

interface AuctionTimerProps {
  endTime: Date;
}

export const AuctionTimer = ({ endTime }: AuctionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex gap-2 text-sm">
      <div className="bg-primary/10 rounded-md p-2 text-center">
        <span className="font-bold">{timeLeft.days}</span>
        <p className="text-xs text-muted-foreground">Days</p>
      </div>
      <div className="bg-primary/10 rounded-md p-2 text-center">
        <span className="font-bold">{timeLeft.hours}</span>
        <p className="text-xs text-muted-foreground">Hours</p>
      </div>
      <div className="bg-primary/10 rounded-md p-2 text-center">
        <span className="font-bold">{timeLeft.minutes}</span>
        <p className="text-xs text-muted-foreground">Mins</p>
      </div>
      <div className="bg-primary/10 rounded-md p-2 text-center">
        <span className="font-bold">{timeLeft.seconds}</span>
        <p className="text-xs text-muted-foreground">Secs</p>
      </div>
    </div>
  );
};
