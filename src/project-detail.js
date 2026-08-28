import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { initThreeEngine } from "./three-scene.js";
import ProjectDetailApp from "./components/ProjectDetailApp.jsx";

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(React.createElement(ProjectDetailApp));
}

// Initialize 3D WebGL Three.js Scene safely without blocking rendering
let initialized3D = false;

function activate3D() {
  if (initialized3D) return;
  initialized3D = true;
  initThreeEngine();
}

function schedule3D() {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => activate3D(), { timeout: 4000 });
  } else {
    setTimeout(activate3D, 2000);
  }
}

if (document.readyState === "complete") {
  schedule3D();
} else {
  window.addEventListener("load", schedule3D, { once: true });
}

["pointerdown", "touchstart", "wheel", "keydown", "scroll", "mousemove"].forEach((event) => {
  window.addEventListener(event, activate3D, { once: true, passive: true });
});

