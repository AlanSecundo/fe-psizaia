import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import "@/styles/globals.css";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryProvider>
    </StrictMode>,
);
