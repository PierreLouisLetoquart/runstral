"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setOnboardingCookie } from "./action";
import { usePathname } from "next/navigation";

export default function Onboarding({ hasCookie }: { hasCookie: boolean }) {
  const pathname = usePathname();
  const [step, setStep] = useState(1);

  const stepContent = [
    {
      image: "/onboarding-1.png",
      title: "Welcome to Runstral 🏃‍♂️",
      description:
        "Your AI-powered running companion that makes every run purposeful and enjoyable.",
    },
    {
      image: "/onboarding-2.png",
      title: "Tell Us About You 🎯",
      description:
        "Share your fitness level and goals so we can create the perfect running plan tailored just for you.",
    },
    {
      image: "/onboarding-3.png",
      title: "Smart Session Planning ✨",
      description:
        "Transform your running goals into personalized training sessions with just a few clicks.",
    },
    {
      image: "/onboarding-4.png",
      title: "Time to Hit the Road! 🚀",
      description:
        "Get ready for an exciting journey to become a better runner. Let's start running!",
    },
  ];

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  if (pathname === "/login") return null;

  return (
    <Dialog
      defaultOpen={!hasCookie}
      onOpenChange={(open) => {
        if (open) setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full" variant="ghost" size={"icon"}>
          <HelpCircle className="size-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <Image
            priority={true}
            loading="eager"
            className="w-full rounded-lg"
            src={stepContent[step - 1].image}
            width={800}
            height={392.6}
            alt="runstral banner image in dialog"
          />
        </div>
        <div className="space-y-6 px-6 pb-6 pt-3">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription>
              {stepContent[step - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-primary",
                    index + 1 === step ? "bg-primary" : "opacity-20",
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={setOnboardingCookie}
                  type="button"
                  variant="ghost"
                >
                  Skip
                </Button>
              </DialogClose>
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button onClick={setOnboardingCookie} type="button">
                    Okay
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
