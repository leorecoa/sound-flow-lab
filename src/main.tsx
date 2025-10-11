import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <UserPreferencesProvider>
      <App />
    </UserPreferencesProvider>
  </ThemeProvider>
);
