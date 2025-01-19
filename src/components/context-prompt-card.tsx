"use client";

import { WandSparkles } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useUserContext } from "@/contexts/user-context";
import { improvePrompt } from "@/app/actions";

export function ContextPromptCard() {
  const { sentence, setSentence, saveContext } = useUserContext();
  const [isImproving, setIsImproving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Auto-save when content changes (with debounce)
  useEffect(() => {
    if (!isDirty) return;

    const timeoutId = setTimeout(() => {
      saveContext();
      setIsDirty(false);
    }, 5000); // 5 second delay

    return () => clearTimeout(timeoutId);
  }, [sentence, isDirty, saveContext]);

  const handleImprove = async () => {
    if (!sentence) return;

    setIsImproving(true);
    try {
      const improvedSentence = await improvePrompt(sentence);
      if (improvedSentence && typeof improvedSentence === "string") {
        setSentence(improvedSentence);
        setIsDirty(true);
      }
    } catch (error) {
      console.error("Error improving prompt:", error);
    } finally {
      setIsImproving(false);
    }
  };

  const handleChange = (value: string) => {
    setSentence(value);
    setIsDirty(true);
  };

  return (
    <div
      className={`p-[8px] rounded-[18px] border border-dashed ${
        sentence ? "border-border" : "border-[#F5A898] dark:border-[#853A2D]"
      }`}
    >
      <Textarea
        className={`border-none h-[90px] md:h-[130px] resize-none outline-none focus-visible:ring-0 shadow-none leading-8 ${
          sentence
            ? "placeholder:text-foreground"
            : "placeholder:text-[#D13415] dark:placeholder:text-[#FF977D]"
        }`}
        placeholder="Tell us about your situation, objective..."
        value={sentence || undefined}
        onChange={(e) => handleChange(e.target.value)}
        maxLength={150}
      />
      <div className="flex justify-end gap-2">
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
