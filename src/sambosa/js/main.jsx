import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Import pages
import Index from "./index";

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);

// Run react inside index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
