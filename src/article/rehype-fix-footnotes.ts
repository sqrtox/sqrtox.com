import type { Root } from "hast";
import { select, selectAll } from "hast-util-select";
import { toText } from "hast-util-to-text";
import type { Plugin } from "unified";

export const rehypeFixFootnotes: Plugin<[], Root, Root> = () => (tree) => {
  const label = select("#footnote-label", tree);

  if (label) {
    label.tagName = "h1";
  }

  const footnotes: Map<string, string> = new Map();

  for (const fn of selectAll("li[id^=user-content-fn-]", tree)) {
    const id = fn.properties.id;

    if (typeof id !== "string") continue;

    footnotes.set(id, toText(fn));
  }

  for (const fnref of selectAll("a[id^=user-content-fnref-]", tree)) {
    const fnId = fnref.properties.href;

    if (typeof fnId !== "string") continue;

    const fn = footnotes.get(fnId.slice(1));

    if (fn === undefined) continue;

    fnref.properties.title = fn;

    // expect `children: [ { type: 'text', value: '1' } ],`
    const first = fnref.children[0];

    if (first?.type === "text") {
      first.value = `[${first.value}]`;
    }
  }
};
