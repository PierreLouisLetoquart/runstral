import { createClient } from "@/lib/supabase/server";
import { NewSessionCard } from "@/components/new-session-card";
import { ContextPromptCard } from "@/components/context-prompt-card";
import { Database } from "@/lib/database.types";
import { RunSessionCard } from "@/components/run-session-card";

type RunningSession = Database["public"]["Tables"]["sessions"]["Row"];

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No user found");
    return <div>Error loading user</div>;
  }

  const { data: sessions, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .eq("displayed", true)
    .order("day", { ascending: true });

  if (error) {
    console.error("Error fetching running sessions:", error);
    return <div>Error loading running sessions</div>;
  }

  console.log(`Fetched ${sessions.length} running sessions`);

  return (
    <div className="flex flex-col gap-8 mt-12">
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
            <div className="w-full space-y-3 p-[12px] rounded-[18px] bg-[#FBEBFB] border border-[#E9C2EC] dark:bg-[#351A35] dark:border-[#5E3061]">
              <p className="leading-7 text-[#953EA3] dark:text-[#E796F3]">
                😔 You have no running sessions yet... Create a new one using
                the form below!
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
    </div>
  );
}
