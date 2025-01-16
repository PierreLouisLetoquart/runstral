import { Database } from "@/lib/database.types";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

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
  cooldown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  created_at,
  day,
  description,
  duration,
  id,
  intensity,
  type,
  warmup,
  ...props
}: RunSessionCardProps) {
  return (
    <div
      id={id}
      className={cn("rounded-lg border p-4 space-y-2", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{type || "Untitled Session"}</h3>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            completed
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="text-sm text-gray-500">
        <p>Day: {day}</p>
        {duration && <p>Duration: {duration} minutes</p>}
        {intensity && <p>Intensity: {intensity}</p>}
      </div>

      {description && <p className="text-sm text-gray-600">{description}</p>}

      <div className="text-sm grid grid-cols-2 gap-2">
        {warmup && (
          <div className="text-blue-600">
            <p className="font-medium">Warmup</p>
            <p>{warmup}</p>
          </div>
        )}
        {cooldown && (
          <div className="text-purple-600">
            <p className="font-medium">Cooldown</p>
            <p>{cooldown}</p>
          </div>
        )}
      </div>
    </div>
  );
}
