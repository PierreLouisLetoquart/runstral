import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

// eslint-disable-next-line -- Weird eslint error saying equals to supertype (makes sense btw, but let me do my thing)
interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <header
      className={cn("w-full h-16 flex items-center justify-between", className)}
      {...props}
    >
      <h1 className="text-xl font-bold tracking-tight">Runstral</h1>
      <ModeToggle />
    </header>
  );
}
