import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CountDown = ({ targetUnixTime, className }) => {
  const { t } = useTranslation();
  // Convert the Unix timestamp to milliseconds if it's in seconds
  const targetDate = targetUnixTime * 1000; // Assuming targetUnixTime is in seconds

  // State to hold the remaining time
  const [timeRemaining, setTimeRemaining] = useState(
    targetDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = targetDate - currentTime;

      // If the target date is passed, clear the interval
      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(remainingTime);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [targetDate]);

  // Convert remaining time into days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <span className={cn("inline text-xl", className)}>
      {t("extraText.endingIn")}
      <span className="ms-1">{days}d</span>:<span>{hours}h</span>:
      <span>{minutes}m</span>:<span>{seconds}s</span>
    </span>
  );
};

export default CountDown;
