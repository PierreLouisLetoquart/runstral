import { WandSparkles } from "lucide-react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function ContextPromptCard() {
  return (
    <div className="p-[8px] rounded-[18px] border border-border border-dashed">
      <Textarea
        className="border-none h-[90px] md:h-[130px] resize-none outline-none focus-visible:ring-0 shadow-none"
        placeholder="I work a lot at a desk but I want to prepare a marathon..."
      />
      <div className="text-end">
        <Button variant={"outline"} size={"sm"} className="rounded-[10px]">
          Improve
          <WandSparkles className="pl-1.5 size-[1rem]" />
        </Button>
      </div>
    </div>
  );
}
