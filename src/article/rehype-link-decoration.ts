import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Element, Root } from "hast";
import { fromHtml } from "hast-util-from-html";
import { selectAll } from "hast-util-select";
import isRelativeUrl from "is-relative-url";
import type { Plugin } from "unified";
import { ROOT_DIR } from "./path";

const OPEN_IN_NEW_ICON_PATH = join(
  ROOT_DIR,
  "node_modules/@material-symbols/svg-700/outlined/open_in_new.svg",
);

const OPEN_IN_NEW_ICON_SVG = await readFile(OPEN_IN_NEW_ICON_PATH, "utf8");

const openInNewIconSvg = fromHtml(OPEN_IN_NEW_ICON_SVG, {
  fragment: true,
  space: "svg",
});

for (const node of selectAll("svg", openInNewIconSvg)) {
  node.properties.class = "openInNewIcon";
}

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
      node.children.push(...(openInNewIconSvg.children as Element[]));
    }
  }
};
