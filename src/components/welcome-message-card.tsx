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
        🖥️ The app works perfectly on desktop and tablet, but it&apos;s not 100%
        optimized for mobile yet.
      </p>
      <p className="leading-7 text-[#582D1D] dark:text-[#FFE0C2]">
        🧪 This app is higly experimental! Please prompt new runs/sessions
        regarless of the current state and context of the app.
      </p>
      <p className="leading-7 text-[#582D1D] dark:text-[#FFE0C2]">
        😄 Mistral formatted output is used and the alpha stage of the app is
        focused on the basics, please be gentle with the feedback and report any
        issues you find ;)
      </p>
      <p className="leading-7 text-[#582D1D] dark:text-[#FFE0C2]">
        Note: Context isn&apos;t up for the moment, so you can ignore the right
        side of the screen.
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
