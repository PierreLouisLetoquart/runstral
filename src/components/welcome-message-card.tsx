"use client";

// TODO: change the localStorage stuff to a cookies logic...
// rn it's just a quick and dirty way to make it work and creates content flashing
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function WelcomeMessageCard() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const welcomeMessageSeen = localStorage.getItem("mistral-welcome-message");
    if (welcomeMessageSeen === "false") {
      setShowMessage(false);
    }
  }, []);

  const handleGotIt = () => {
    localStorage.setItem("mistral-welcome-message", "false");
    setShowMessage(false);
  };

  if (!showMessage) {
    return null;
  }

  return (
    <div className="w-full space-y-3 p-[12px] rounded-[18px] bg-[#FFEFD6] border border-[#FFC182] dark:bg-[#331E0B] dark:border-[#66350C]">
      <p className="leading-7 text-[#582D1D] dark:text-[#FFE0C2]">
        🏃‍♂️ Welcome to Runstral - Your AI-powered running session generator!
      </p>
      <p className="leading-7 text-[#582D1D] dark:text-[#FFE0C2]">
        💪 Create personalized running workouts based on your fitness level and
        goals using advanced AI technology.
      </p>
      <p className="leading-7 text-[#582D1D] dark:text-[#FFE0C2]">
        ⚠️ Please note: This is an experimental app in alpha stage. The
        interface works best on desktop and tablet devices. Also it uses
        formatted output for the Mistral API, so it may encounter some issues.
        Please report any bugs or issues you encounter ;) Enjoy your run!
      </p>
      <div>
        <Button
          className="mt-3 bg-[#F76B15] text-white hover:bg-[#EF5F00] rounded-[6px] dark:bg-[#F76B15] dark:hover:bg-[#FF801F] dark:text-black"
          variant={"default"}
          size={"sm"}
          onClick={handleGotIt}
        >
          I understand!
        </Button>
      </div>
    </div>
  );
}
