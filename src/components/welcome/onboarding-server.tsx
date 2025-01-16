import { cookies } from "next/headers";
import Onboarding from "./onboarding";

export async function OnboardingComp() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("onboarding");
  return <Onboarding hasCookie={hasCookie} />;
}
