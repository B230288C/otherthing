import React from "react";
import ReactDOM from "react-dom/client";
import CalendarPage from "./Components/CalendarPage";

const rootElement = document.getElementById("calendar-root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <CalendarPage />
    </React.StrictMode>
  );
}
