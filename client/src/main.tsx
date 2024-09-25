import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
