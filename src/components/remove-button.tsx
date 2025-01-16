"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { removeSession } from "@/app/actions";

export function RemoveBtn({ sessionId }: { sessionId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      await removeSession(sessionId);
    });
  };

  return (
    <Button
      onClick={handleRemove}
      disabled={isPending}
      size={"sm"}
      variant="link"
    >
      remove
    </Button>
  );
}
