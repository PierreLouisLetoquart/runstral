"use client";

import { LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignoutButon() {
  const router = useRouter();
  const pathname = usePathname();
  const client = createClient();

  function signOut() {
    client.auth.signOut();
    router.push("/login");
  }

  if (pathname === "/login") return null;

  return (
    <Button
      onClick={signOut}
      variant={"ghost"}
      size={"icon"}
      className="rounded-full"
    >
      <LogOut className="size-[1.2rem]" />
    </Button>
  );
}
