import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { SignoutButon } from "./signout-button";
import { OnboardingComp } from "./welcome/onboarding-server";

// eslint-disable-next-line -- Weird eslint error saying equals to supertype (makes sense btw, but let me do my thing)
interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <header
      className={cn("w-full h-16 flex items-center justify-between", className)}
      {...props}
    >
      <Link className="flex items-center gap-2" href={"/"}>
        <Image
          className="block dark:hidden"
          src="/logo.png"
          alt="Runstral Logo"
          width={30}
          height={30}
        />
        <Image
          className="hidden dark:block"
          src="/logo-dark.png"
          alt="Runstral Logo"
          width={30}
          height={30}
        />
        <h1 className="text-lg leading-5 font-bold tracking-tight">
          Runstral
          <br />
          run_
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        <OnboardingComp />
        <ModeToggle />
        <SignoutButon />
      </div>
    </header>
  );
}
