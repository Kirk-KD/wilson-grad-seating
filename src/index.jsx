import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./components/context/AuthContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId="903859362360-468brlfju728u6ido76bpth232rpdf9t.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>
);
