import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserPreferences {
  playbackSpeed: number;
  autoPlay: boolean;
  language: "pt" | "en";
  theme: "light" | "dark" | "system";
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  playbackSpeed: 1,
  autoPlay: false,
  language: "pt",
  theme: "system",
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(
  undefined
);

export const UserPreferencesProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem("userPreferences");
      return stored ? JSON.parse(stored) : defaultPreferences;
    } catch (error) {
      console.error("Failed to load user preferences:", error);
      return defaultPreferences;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("userPreferences", JSON.stringify(preferences));
    } catch (error) {
      console.error("Failed to save user preferences:", error);
    }
  }, [preferences]);

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <UserPreferencesContext.Provider
      value={{ preferences, updatePreference, resetPreferences }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error("useUserPreferences must be used within UserPreferencesProvider");
  }
  return context;
};
