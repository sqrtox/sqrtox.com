import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./content.module.scss";

export const useInternalLinkRouter = (): void => {
  const router = useRouter();

  useEffect(() => {
    const contentEl = document.getElementsByClassName(styles.content)[0];
    if (!contentEl) return;

    const controller = new AbortController();

    contentEl.addEventListener(
      "click",
      (event) => {
        const target = event.target as HTMLAnchorElement;

        if (!target.classList.contains("internalLink")) return;
        if (target.href.startsWith("#")) return;

        event.preventDefault();
        router.push(target.href);
      },
      {
        signal: controller.signal,
      },
    );

    return () => {
      controller.abort();
    };
  }, [router]);
};
