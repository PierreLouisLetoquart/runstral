// S/O to https://originui.com/dropdowns-popovers
"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Tip {
  title: string;
  description: string;
}

interface TooltipWithNavProps {
  tips: Tip[];
}

export default function TooltipWithNav({ tips }: TooltipWithNavProps) {
  const [currentTip, setCurrentTip] = useState(0);

  const handleNext = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1);
    }
  };

  const handlePrev = () => {
    if (currentTip > 0) {
      setCurrentTip(currentTip - 1);
    }
  };

  const isFirstTip = currentTip === 0;
  const isLastTip = currentTip === tips.length - 1;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer px-[10px] py-[6px] rounded-[6px] text-xs font-medium border border-[#E9C2EC] dark:border-[#5E3061] hover:bg-muted">
          {"WU & CD"}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[280px] py-3 shadow-none" side="top">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-[13px] font-medium">{tips[currentTip].title}</p>
            <p className="text-xs text-muted-foreground">
              {tips[currentTip].description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {currentTip + 1}/{tips.length}
            </span>
            <div className="flex gap-0.5">
              <Button
                size="icon"
                variant="ghost"
                className="size-6"
                onClick={handlePrev}
                disabled={isFirstTip}
                aria-label="Previous"
              >
                <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-6"
                onClick={handleNext}
                disabled={isLastTip}
                aria-label="Next"
              >
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
