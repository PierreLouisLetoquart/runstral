"use server";

import { createMistral } from "@ai-sdk/mistral";
import { generateText } from "ai";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function generateSession(prompt: string) {
  const mistral = createMistral();
  const model = mistral("ministral-8b-latest");

  const systemPrompt = `
    You are an expert runner and you have trained lot of athletes.
    You are currently trainning middle level athletes and you are planning a running session for them.
    It is super important to make sure that the session is well planned and the athletes are able to complete it.
    The session should be challenging but not too hard.
    The athletes should be able to complete the session and feel good about it. Remember that the athletes are not professional runners.

    The athletes ask you for the following session:

    ${prompt}

    You must answer with a unique sentence that is not too long. The sentence must contains two key parameters: the duration of the session and the intensity of the session.
    The sentence must be clear and easy to understand for the athletes.

    Example: "The session will last 45 minutes and it will be at a moderate intensity."
    Example 2: "A session of 60 minutes at a high intensity."
    Example 3: "A Fartlek session of 30 minutes, e.g. 1 minute fast, 1 minute slow."
    Example 4: "A session of 45 minutes with 5x1km at 5k pace with 2 minutes rest."

    The three session durations are: 30 minutes, 45 minutes, and 60 minutes.
    The three session intensities are: easy, moderate, and hard.
    The session can be a continuous run, intervals, fartlek, or an other well known running session! No creative sessions please.

    For the prompt "${prompt}",
    your perfect session answer is:
    `;

  const { text } = await generateText({ model, prompt: systemPrompt });

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("running_sessions").insert([
    {
      user_id: user.id,
      session_content: text,
      completed: false,
    },
  ]);

  if (error) {
    console.error("Error inserting session:", error);
  }

  revalidatePath("/", "layout");
}

export async function completeSession(sessionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("running_sessions")
    .update({ completed: true })
    .match({ id: sessionId });

  if (error) {
    console.error("Error completing session:", error);
  }

  revalidatePath("/", "layout");
}
