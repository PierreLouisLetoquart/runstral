import { z } from "zod";

export const generateSchema = z.object({
  user_context: z.string({
    message: "Missing context :(",
  }),
  session_mood: z.string({
    message: "Missing field session mood :(",
  }),
  session_prompt: z.string({
    message: "Missing field session prompt :(",
  }),
  date: z.date({
    required_error: "A date for the session is required.",
  }),
});
