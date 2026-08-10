import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { BrowserRouter } from "react-router";
import { setupInterceptors } from "./services/interceptors.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

setupInterceptors();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
