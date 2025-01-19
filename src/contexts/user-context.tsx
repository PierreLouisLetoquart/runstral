"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { createClient } from "@/lib/supabase/client";

interface UserContextType {
  sentence: string | null;
  setSentence: (text: string) => void;
  saveContext: () => Promise<void>;
  isSaving: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [sentence, setSentence] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveContext = useCallback(async () => {
    if (!sentence) return;

    setIsSaving(true);
    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Check if context already exists
      const { data: existingContext } = await supabase
        .from("contexts")
        .select()
        .eq("user_id", user.id)
        .single();

      if (existingContext) {
        // Update existing context
        await supabase
          .from("contexts")
          .update({ text: sentence })
          .eq("user_id", user.id);
      } else {
        // Insert new context
        await supabase
          .from("contexts")
          .insert([{ user_id: user.id, text: sentence }]);
      }
    } catch (error) {
      console.error("Error saving context:", error);
    } finally {
      setIsSaving(false);
    }
  }, [sentence]);

  const value = useMemo(
    () => ({
      sentence,
      setSentence,
      saveContext,
      isSaving,
    }),
    [sentence, isSaving, setSentence, saveContext],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
