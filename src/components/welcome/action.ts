"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setOnboardingCookie() {
  const cookieStore = await cookies();

  const hasCookie = cookieStore.has("onboarding");

  if (hasCookie) {
    return;
  }

  cookieStore.set("onboarding", "true", {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  revalidatePath("/");
}
