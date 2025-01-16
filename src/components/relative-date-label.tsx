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
    if (isTodayDate) return "text-[#203C25] dark:text-[#C2F0C2]";
    if (isPastDate) return "text-[#5C271F] dark:text-[#FBD3CB]";
    return "text-[#113264] dark:text-[#C2E6FF]";
  };

  if (completed) {
    return (
      <p
        className={cn(
          "tracking-tight text-sm font-light text-[#5C271F] dark:text-[#FBD3CB]",
          className,
        )}
        {...props}
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
      {...props}
    >
      {getRelativeDate()}
    </p>
  );
}
