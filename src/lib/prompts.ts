import { Database } from "./database.types";

type RunningSession = Database["public"]["Tables"]["sessions"]["Row"];

export function constructMessagePrompt(
  user_context: string,
  session_mood: string,
  session_prompt: string,
  previous_sessions: RunningSession[] | null,
  upcoming_sessions: RunningSession[] | null,
) {
  const userPrompt = `
    You are an AI assistant acting as a knowledgeable and supportive running coach.
    Your task is to help users generate personalized running sessions based on their
    current physical mood, desired session type, and training history/plan.

    You will receive the following inputs:

    1. The user's current physical situation and brief description:
    <context>
    ${user_context}
    </context>

    2. Previous 3 running sessions:
    <previous_sessions>
    ${previous_sessions ? JSON.stringify(previous_sessions, null, 2) : "No previous sessions planned."}
    </previous_sessions>

    3. Upcoming 3 planned sessions:
    <upcoming_sessions>
    ${upcoming_sessions ? JSON.stringify(upcoming_sessions, null, 2) : "No upcoming sessions planned."}
    </upcoming_sessions>

    4. A brief description of the desired running session:
    <session_prompt>
    ${session_prompt}
    </session_prompt>

    Using this information, create a tailored running session that
    takes into account the user's current state, recent training load, and upcoming sessions.
    Follow these guidelines:

    1. Analyze the user's mood and recent training load to adjust the intensity and duration.
    2. Consider the upcoming sessions to ensure proper recovery and progression.
    3. Include a warm-up, main workout, and cool-down in your session plan.
    4. Provide specific details such as distance, pace, or time for each part of the workout.
    5. Add motivational comments or tips to encourage the user.

    The answer must be a valid JSON object respecting the following schema:
    type Answer = {
      duration: number; // in minutes with increment of 5
      type:
        | "Interval"
        | "Recovery"
        | "Long Run"
        | "Speed Work"
        | "Fartlek"
        | "Hill Repeats"
        | ...;
      intensity: "Low" | "Normal" | "Medium" | "Hard";
      warmup: string; // must be short and concise
      description: string; // must be short and concise
      cooldown: string; // must be short and concise
      training_context?: string; // Optional explanation of how this session fits with previous/upcoming sessions
    };
    `;

  return [
    {
      role: "user",
      content: userPrompt,
    },
  ];
}

export function constructMessageImprovePrompt(prompt: string) {
  const constructedPrompt = `
    Here is the user's original prompt:

    <user_prompt>
    ${prompt}
    </user_prompt>

    To improve this prompt, follow these steps:

    1. Analyze the original prompt:
       - Identify the main goal or purpose of the prompt
       - Note any specific requirements or constraints mentioned
       - Recognize any ambiguities or areas that lack clarity

    2. Consider the following aspects for improvement:
       - Clarity: Ensure the prompt is easy to understand and leaves no room for misinterpretation
       - Structure: Organize the prompt in a logical and coherent manner
       - Completeness: Address all relevant aspects of generating running sessions
       - Tone and style: Adjust the language to be more direct and actionable

    3. Enhance the prompt by:
       - Rephrasing unclear sections
       - Removing unnecessary or redundant elements
       - Incorporating best practices for prompt engineering

    Provide your response in the following format:

    NO ANALYSIS, NO EXPLANATIONS, JUST THE IMPROVED PROMPT.

    <improved_prompt>
    Write the improved version of the prompt here. This should be a complete, ready-to-use prompt that incorporates all your enhancements.
    IMPORTANT: It must be short and concise, focusing on the key elements for generating running sessions.
    </improved_prompt>

    Remember to maintain the original intent of the user's prompt while making it more effective for AI-generated running sessions.

    The perfect prompt is:
    `;

  return [
    {
      role: "system",
      content: `
        You are an AI assistant that specializes in prompt engineering.
        Your task is to analyze and improve a user-provided prompt for an app
        that generates running sessions. The goal is to enhance the effectiveness
        and clarity of the prompt to ensure better results from the AI system.
      `,
    },
    {
      role: "user",
      content: constructedPrompt,
    },
  ];
}
