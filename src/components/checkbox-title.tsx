"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { completeSession } from "@/app/generate";
import { HTMLAttributes, useTransition } from "react";
import { cn } from "@/lib/utils";

interface CheckBoxTitleProps extends HTMLAttributes<HTMLDivElement> {
  session_id: string;
  text: string;
  checked: boolean;
}

export default function CheckBoxTitle({
  className,
  session_id,
  text,
  checked,
  ...props
}: CheckBoxTitleProps) {
  const [isPending, startTransition] = useTransition();

  const handleCheckboxChange = () => {
    startTransition(async () => {
      await completeSession(session_id);
    });
  };

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Checkbox
        id={session_id}
        className="rounded-full data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
        checked={checked}
        disabled={isPending || checked}
        onCheckedChange={handleCheckboxChange}
      />
      <Label
        htmlFor={session_id}
        className="peer-data-[state=checked]:line-throgh relative after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:bg-muted-foreground after:transition-transform after:ease-in-out peer-data-[state=checked]:text-muted-foreground peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      >
        {text}
      </Label>
    </div>
  );
}
