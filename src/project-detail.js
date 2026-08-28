import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./three-scene.js";
import ProjectDetailApp from "./components/ProjectDetailApp.jsx";

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(React.createElement(ProjectDetailApp));
}
