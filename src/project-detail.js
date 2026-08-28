import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { initThreeEngine } from "./three-scene.js";
import ProjectDetailApp from "./components/ProjectDetailApp.jsx";

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(React.createElement(ProjectDetailApp));
}

// Initialize 3D WebGL Three.js Scene immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initThreeEngine());
} else {
  initThreeEngine();
}
