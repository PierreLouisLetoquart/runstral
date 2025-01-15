"use client";

// TODO: change the localStorage stuff to a cookies logic...
// rn it's just a quick and dirty way to make it work and creates content flashing
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome 👋</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="leading-7 font-light">
          This app is <span className="font-semibold">higly experimental!</span>{" "}
          Please prompt new runs/sessions regarless of the current state and
          context of the app.
        </p>
        <p className="leading-7 font-light">
          If you are not familiar with the running sessions, the three main
          sessions styles are: easy, tempo and interval. You can then add a
          notion of distance and duration to each session 😼
        </p>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"} size={"sm"} onClick={handleGotIt}>
          Got it!
        </Button>
      </CardFooter>
    </Card>
  );
}
