import { WelcomeMessageCard } from "@/components/welcome-message-card";
import { createClient } from "@/lib/supabase/server";
import { NewSessionCard } from "@/components/new-session-card";
import { ContextPromptCard } from "@/components/context-prompt-card";
import { Database } from "@/lib/database.types";
import { RunSessionCard } from "@/components/run-session-card";

type RunningSession = Database["public"]["Tables"]["sessions"]["Row"];

export default async function Page() {
  const supabase = await createClient();

  const { data: sessions, error } = await supabase
    .from("sessions")
    .select("*")
    .order("day", { ascending: false });

  if (error) {
    console.error("Error fetching running sessions:", error);
    return <div>Error loading running sessions</div>;
  }

  return (
    <div className="flex flex-col gap-8 mt-12">
      <WelcomeMessageCard />

      <section className="w-full flex flex-col-reverse md:flex-row gap-6">
        <section className="w-full md:w-2/3 space-y-3">
          <h2 className="text-sm font-bold tracking-tight">Running sessions</h2>
          {sessions && sessions.length > 0 ? (
            <div className="grid gap-4">
              {sessions.map((session: RunningSession) => (
                <RunSessionCard key={session.id} {...session} />
              ))}
            </div>
          ) : (
            <div className="w-full space-y-3 p-[12px] rounded-[18px] bg-[#E9F6E9] border border-[#B2DDB5] dark:bg-[#1B2A1E] dark:border-[#2D5736]">
              <p className="leading-7 text-[#203C25] dark:text-[#C2F0C2]">
                You have no sessions yet... Create one using the session
                generation form powered by Mistral® AI bellow 🔮
              </p>
            </div>
          )}
          <NewSessionCard />
        </section>
        <section className="w-full md:w-1/3 space-y-3">
          <h2 className="text-sm font-bold tracking-tight">Context</h2>
          <ContextPromptCard />
        </section>
      </section>

      {/* <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Running Sessions</h2>

        {sessions && sessions.length > 0 ? (
          <div className="grid gap-4">
            {sessions.map((session: RunningSession) => (
              <SessionCard
                key={session.id}
                id={session.id}
                created_at={session.created_at}
                session_content={session.session_content}
                completed={session.completed}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted rounded-lg">
            <p className="text-lg text-muted-foreground">
              You haven&apos;t created any running sessions yet.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Use the form above to generate your first session!
            </p>
          </div>
        )}
      </div> */}

      {/* <NewSessionForm /> */}
    </div>
  );
}
