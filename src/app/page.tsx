import { NewSessionForm } from "@/components/new-session-form";
import { WelcomeMessageCard } from "@/components/welcome-message-card";
import { SessionCard } from "@/components/session-card";
import { createClient } from "@/lib/supabase/server";

type RunningSession = {
  id: number;
  created_at: string;
  session_content: string;
  completed: boolean;
};

export default async function Page() {
  const supabase = await createClient();

  const { data: sessions, error } = await supabase
    .from("running_sessions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching running sessions:", error);
    return <div>Error loading running sessions</div>;
  }

  return (
    <div className="flex flex-col gap-8 mt-12">
      <WelcomeMessageCard />

      <div className="w-full max-w-2xl mx-auto">
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
      </div>

      <NewSessionForm />
    </div>
  );
}
