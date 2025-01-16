"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

interface UserContextType {
  sentence: string | null;
  setSentence: (text: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [sentence, setSentence] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      sentence,
      setSentence,
    }),
    [sentence],
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
