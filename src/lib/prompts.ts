export function constructMessagePrompt(
  user_context: string,
  session_mood: string,
  session_prompt: string,
) {
  const assistantPrompt = `
    You are an AI assistant acting as a knowledgeable and supportive running coach.
    Your task is to help users generate personalized running sessions based on their
    current physical mood and desired session type.

    You will receive two inputs:
    1. The user's current physical situation and brief description:
    <context>
    {{user_context}}
    </context>

    2. A brief description of the desired running session:
    <session_prompt>
    {{session_prompt}}
    </session_prompt>

    Using this information, create a tailored running session that
    takes into account the user's current state and goals. Follow these guidelines:

    1. Analyze the user's mood and adjust the intensity and duration of the session accordingly.
    2. Consider the type of session described in the prompt (e.g., speed work, long run, recovery run).
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
      warmup: string; // // must be short and concise
      description: string; // must be short and concise
      cooldown: string; // must be short and concise
    };

    Here's an example of an output well structured:

    Input:

    <context>
    I am preparing for an 80 km trail run in the French Alps, and I work 6 days a week, 5 hours per day at a desk.
    </context>

    <session_prompt>
    A recovery run with the following mood: Normal
    </session_prompt>

    Output:

    \`\`\`json
    {
      "duration": 60,
      "type": "Recovery",
      "intensity": "Low",
      "warmup": "A 15-minute run with some drills",
      "description": "Recovery run at low intensity with a slight positive elevation gain.",
      "cooldown": "10-minute run at very low intensity, around 6:00 per km.",
    }
    \`\`\`
  `;

  const userPrompt = `
    <context>
    ${user_context}
    </context>

    <session_prompt>
    ${session_prompt} with a mood: ${session_mood}
    </session_prompt>

    Now, using the provided mood and session prompt, the perfect session is:
  `;

  return [
    {
      role: "assistant",
      content: assistantPrompt,
    },
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
       - Specificity: Add more details or parameters if necessary
       - Structure: Organize the prompt in a logical and coherent manner
       - Completeness: Address all relevant aspects of generating running sessions
       - Tone and style: Adjust the language to be more direct and actionable

    3. Enhance the prompt by:
       - Rephrasing unclear sections
       - Adding missing information or context
       - Removing unnecessary or redundant elements
       - Incorporating best practices for prompt engineering

    4. Ensure the improved prompt covers essential aspects of running session generation, such as:
       - General physical condition or mood
       - Intensity or difficulty level desired
       - Type of terrain or environment
       - Any specific goals or focus areas (e.g., speed, endurance, interval training)
       - Any specific course targets (e.g., distance, time, pace) ("Marathon", "5K", "Hill repeats")
       - Consideration of user's fitness level or preferences, if applicable

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
