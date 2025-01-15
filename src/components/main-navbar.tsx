import Link from "next/link";

import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { SignoutButon } from "./signout-button";

// eslint-disable-next-line -- Weird eslint error saying equals to supertype (makes sense btw, but let me do my thing)
interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <header
      className={cn("w-full h-16 flex items-center justify-between", className)}
      {...props}
    >
      <Link href={"/"}>
        <h1 className="text-xl font-bold tracking-tight">Runstral</h1>
      </Link>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <SignoutButon />
      </div>
    </header>
  );
}
