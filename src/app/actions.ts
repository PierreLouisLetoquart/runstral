"use server";

import { Mistral } from "@mistralai/mistralai";
import { format } from "date-fns";

import {
  constructMessageImprovePrompt,
  constructMessagePrompt,
} from "@/lib/prompts";
import { generateSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function generateSession(formData: FormData) {
  const apiKey = process.env.MISTRAL_API_KEY;
  const mistral = new Mistral({ apiKey: apiKey });

  const rawDate = formData.get("date") as string;
  const parsedDate = new Date(rawDate);
  const formattedDate = format(parsedDate, "yyyy/MM/dd");

  const validatedFields = generateSchema.safeParse({
    user_context: formData.get("user_context"),
    session_mood: formData.get("session_mood"),
    session_prompt: formData.get("session_prompt"),
    date: parsedDate,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { user_context, session_mood, session_prompt } = validatedFields.data;

  const messagePrompt = constructMessagePrompt(
    user_context,
    session_mood,
    session_prompt,
  );

  const chatResponse = await mistral.chat.complete({
    model: "mistral-large-latest",
    // @ts-expect-error typescript things...
    messages: messagePrompt,
    responseFormat: { type: "json_object" },
  });

  if (!chatResponse || chatResponse === undefined) {
    console.log("Chat response is undefined");
    return {
      errors: "An error occured during the session creation...",
    };
  }
  // else {
  //   // @ts-expect-error idk...
  //   console.log("JSON:", chatResponse.choices[0].message.content);
  // }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // @ts-expect-error idk...
  const sessionContent = JSON.parse(chatResponse.choices[0].message.content);

  const { error } = await supabase.from("sessions").insert([
    {
      user_id: user.id,
      day: formattedDate,
      duration: sessionContent.duration,
      intensity: sessionContent.intensity,
      type: sessionContent.type,
      description: sessionContent.description,
      warmup:
        sessionContent.warmup ||
        "Start with a 10-minute easy jog followed by dynamic stretches.",
      cooldown:
        sessionContent.cooldown ||
        "Finish with a 10-minute easy jog to cool down.",
      completed: false,
    },
  ]);

  if (error) {
    console.error("Error inserting session:", error);
    return {
      errors: "An error occured during the session creation...",
    };
  }

  revalidatePath("/", "layout");
}

export async function completeSession(sessionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("sessions")
    .update({ completed: true })
    .match({ id: sessionId });

  if (error) {
    console.error("Error completing session:", error);
  }

  revalidatePath("/", "layout");
}

export async function removeSession(sessionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("sessions")
    .update({ displayed: false })
    .match({ id: sessionId });

  if (error) {
    console.error("Error completing session:", error);
  }

  revalidatePath("/", "layout");
}

export async function improvePrompt(prompt: string) {
  const apiKey = process.env.MISTRAL_API_KEY;
  const mistral = new Mistral({ apiKey: apiKey });

  const improvedPrompt = await mistral.chat.complete({
    model: "mistral-large-latest",
    // @ts-expect-error typescript things...
    messages: constructMessageImprovePrompt(prompt),
  });

  if (!improvedPrompt || improvedPrompt === undefined) {
    console.log("Chat response is undefined");
    return {
      errors: "An error occured during the prompt improvement...",
    };
  }

  // clenup the answer
  // @ts-expect-error idk...
  const improvedPromptStr = improvedPrompt.choices[0].message.content as string;

  const improvedPromptCleaned = improvedPromptStr
    .replace("<improved_prompt>", "")
    .replace("</improved_prompt>", "")
    .replace('\"', "")
    .trim();

  return improvedPromptCleaned;
}
