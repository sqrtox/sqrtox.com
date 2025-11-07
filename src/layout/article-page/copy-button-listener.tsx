"use client";

import { useEffect } from "react";

export default function CopyButtonListener() {
  useEffect(() => {
    const content = document.getElementById("articleContent");
    if (!content) return;

    const controller = new AbortController();
    const timers: Map<HTMLElement, ReturnType<typeof setTimeout>> = new Map();
    const copy = (event: Event): void => {
      const target = event.currentTarget as HTMLElement;

      const data = target.getAttribute("data");
      if (!data) return;

      const timer = timers.get(target);

      if (timer !== undefined) {
        clearTimeout(timer);
        timers.delete(target);
      }

      navigator.clipboard.writeText(data);
      target.classList.add("rehype-pretty-copied");
      timers.set(
        target,
        setTimeout(() => target.classList.remove("rehype-pretty-copied"), 2000),
      );
    };

    for (const button of content.getElementsByClassName("rehype-pretty-copy")) {
      button.addEventListener("click", copy);
    }

    return () => {
      controller.abort();
    };
  }, []);

  return null;
}
