import { useState, useEffect } from "react";

export function useTyping(texts) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const full = texts[idx];
    let timer;
    if (phase === "typing") {
      if (display.length < full.length)
        timer = setTimeout(() => setDisplay(full.slice(0, display.length + 1)), 65);
      else timer = setTimeout(() => setPhase("pause"), 1600);
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), 400);
    } else {
      if (display.length > 0)
        timer = setTimeout(() => setDisplay(display.slice(0, -1)), 35);
      else {
        setIdx((idx + 1) % texts.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [display, phase, idx, texts]);

  return display;
}
