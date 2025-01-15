import { NewSessionForm } from "@/components/new-session-form";
import { WelcomeMessageCard } from "@/components/welcome-message-card";
import { createClient } from "@/lib/supabase/server";

// Define a type for the running session
type RunningSession = {
  id: number;
  session_date: string;
  distance: number;
  duration: number;
  completed: boolean;
};

export default async function Page() {
  const supabase = await createClient();

  const { data: sessions, error } = await supabase
    .from("running_sessions")
    .select("*")
    .order("session_date", { ascending: false });

  if (error) {
    // TODO: Handle error properly, like sending to Sentry or similar
    console.error("Error fetching running sessions:", error);
    return <div>Error loading running sessions</div>;
  }

  return (
    <div className="mt-12">
      {sessions && sessions.length > 0 ? (
        <div className="grid gap-4">
          {sessions.map((session: RunningSession) => (
            <div key={session.id} className="border p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Date: {new Date(session.session_date).toLocaleDateString()}
                  </p>
                  <p>Distance: {session.distance} km</p>
                  <p>
                    Duration: {Math.floor(session.duration / 60)} min{" "}
                    {session.duration % 60} sec
                  </p>
                </div>
                <div>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      session.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {session.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <WelcomeMessageCard />
          <p className="text-lg font-light [&:not(:first-child)]:mt-12">
            You have no running sessions yet. Start a new one!
          </p>
          <NewSessionForm />
        </div>
      )}
    </div>
  );
}
