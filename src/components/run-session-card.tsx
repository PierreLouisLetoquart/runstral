import { Database } from "@/lib/database.types";
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import CheckBoxTitle from "./checkbox-title";
import { RelativeDate } from "./relative-date-label";

type Session = Database["public"]["Tables"]["sessions"]["Row"];

interface RunSessionCardProps extends HTMLAttributes<HTMLDivElement> {
  readonly completed: Session["completed"];
  readonly cooldown: Session["cooldown"];
  readonly created_at: Session["created_at"];
  readonly day: Session["day"];
  readonly description: Session["description"];
  readonly duration: Session["duration"];
  readonly id: Session["id"];
  readonly intensity: Session["intensity"];
  readonly type: Session["type"];
  readonly user_id: Session["user_id"];
  readonly warmup: Session["warmup"];
}

export function RunSessionCard({
  className,
  completed,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cooldown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  created_at,
  day,
  description,
  duration,
  id,
  intensity,
  type,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warmup,
  ...props
}: RunSessionCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "p-[12px] rounded-[18px] border border-border space-y-[8px]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <CheckBoxTitle
          session_id={id}
          text={type || "Workout"}
          checked={completed}
        />
        <RelativeDate dateString={day} completed={completed} />
      </div>

      <p className="text-sm font-light leading-7">{description}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="px-[10px] py-[6px] rounded-[6px] text-xs font-medium border border-border">
            ~ {duration} min
          </div>
          <div className="px-[10px] py-[6px] rounded-[6px] text-xs font-medium border border-border">
            Intensity: {intensity}
          </div>
        </div>
        <div className="px-[10px] py-[6px] rounded-[6px] text-xs font-medium border border-border">
          {"WU & CD"}
        </div>
      </div>
    </div>
  );
}
