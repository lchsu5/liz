import { useState, useEffect } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%&|~";

export function useScrambleText(finalText: string): [string, boolean] {
  const [output, setOutput] = useState(finalText);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    let iteration = 0;
    setIsDone(false);
    const interval = setInterval(() => {
      setOutput(
        finalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return finalText[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (frame % 3 === 0) iteration++;
      frame++;
      if (iteration >= finalText.length) {
        clearInterval(interval);
        setOutput(finalText);
        setIsDone(true);
      }
    }, 50); // 50ms × ~30 frames = ~1.5 seconds total
    return () => clearInterval(interval);
  }, [finalText]);

  return [output, isDone];
}
