"use client";

import { WandSparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useUserContext } from "@/contexts/user-context";
import { improvePrompt } from "@/app/actions";

export function ContextPromptCard() {
  const { sentence, setSentence } = useUserContext();

  const [isImproving, setIsImproving] = useState(false);

  const handleImprove = async () => {
    if (!sentence) return;

    setIsImproving(true);
    try {
      const improvedSentence = await improvePrompt(sentence);
      if (improvedSentence && typeof improvedSentence === "string") {
        setSentence(improvedSentence);
      }
    } catch (error) {
      console.error("Error improving prompt:", error);
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="p-[8px] rounded-[18px] border border-border border-dashed">
      <Textarea
        className="border-none h-[90px] md:h-[130px] resize-none outline-none focus-visible:ring-0 shadow-none leading-8"
        placeholder="I work a lot at a desk but I want to prepare a marathon..."
        value={sentence || undefined}
        onChange={(e) => setSentence(e.target.value)}
        maxLength={150}
      />
      <div className="text-end">
        <Button
          onClick={handleImprove}
          disabled={isImproving}
          variant={"outline"}
          size={"sm"}
          className="rounded-[10px]"
        >
          Improve
          <WandSparkles className="pl-1.5 size-[1rem]" />
        </Button>
      </div>
    </div>
  );
}
