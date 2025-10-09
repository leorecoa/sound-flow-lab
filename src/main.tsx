import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import { ThemeProvider } from "./pages/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="soundflow-theme">
    <UserPreferencesProvider>
      <App />
    </UserPreferencesProvider>
  </ThemeProvider>
);
