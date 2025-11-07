import type { Root } from "hast";
import { selectAll } from "hast-util-select";
import isRelativeUrl from "is-relative-url";
import type { Plugin } from "unified";

export const rehypeLinkDecoration: Plugin<[], Root, Root> = () => (tree) => {
  for (const node of selectAll("a", tree)) {
    const props = node.properties;

    if (typeof props.href !== "string") continue;

    const internalLink = isRelativeUrl(props.href, {
      allowProtocolRelative: false,
    });

    if (internalLink) {
      props.class = `${props.class ?? ""} internalLink`.trim();
    } else {
      props.class = `${props.class ?? ""} externalLink`.trim();
      props.target = "_blank";
      props.rel = "noopener noreferrer";
      node.children.push({
        type: "element",
        tagName: "open-in-new-icon",
        properties: {},
        children: [],
      });
    }
  }
};
