"use client";

import { Button } from "@/components/ui/button";
import { completeSession } from "@/app/action";

type SessionCardProps = {
  id: number;
  created_at: string;
  session_content: string;
  completed: boolean;
};

export function SessionCard({
  id,
  created_at,
  session_content,
  completed,
}: SessionCardProps) {
  const handleComplete = async () => {
    try {
      await completeSession(id.toString());
    } catch (error) {
      console.error("Error completing session:", error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">
              {new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-base">{session_content}</p>
          </div>
          <div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                completed
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {completed ? "Completed" : "Pending"}
            </span>
          </div>
        </div>
        {!completed && (
          <div className="flex justify-end">
            <Button
              onClick={handleComplete}
              variant="outline"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              Mark as completed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
