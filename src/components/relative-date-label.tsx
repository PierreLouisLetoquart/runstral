import { HTMLAttributes } from "react";
import { formatDistanceToNow, isToday, isPast, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface RelativeDateProps extends HTMLAttributes<HTMLParagraphElement> {
  dateString: string;
  completed: boolean;
}

export function RelativeDate({
  className,
  dateString,
  completed,
  ...props
}: RelativeDateProps) {
  const date = parseISO(dateString);
  const isTodayDate = isToday(date);
  const isPastDate = isPast(date);

  const getRelativeDate = () => {
    if (isTodayDate) return "Today";

    const distance = formatDistanceToNow(date, { addSuffix: true });
    return distance.charAt(0).toUpperCase() + distance.slice(1);
  };

  const getDateColor = () => {
    if (isTodayDate) return "text-emerald-500";
    if (isPastDate) return "text-red-500";
    return "text-blue-500";
  };

  if (completed) {
    return (
      <p
        className={cn(
          "tracking-tight text-sm font-light text-emerald-500",
          className,
        )}
      >
        Completed
      </p>
    );
  }

  return (
    <p
      className={cn(
        "tracking-tight text-sm font-light",
        getDateColor(),
        className,
      )}
    >
      {getRelativeDate()}
    </p>
  );
}
