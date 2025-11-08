import type { Nodes, Parents } from "hast";

export const toString_ = (node: Nodes): string =>
  "children" in node ? all(node) : "value" in node ? node.value : "";

const one = (node: Nodes): string => {
  if (node.type === "element" && node.tagName === "style") {
    return "";
  }

  if (node.type === "text") {
    return node.value;
  }

  if ("children" in node) {
    return all(node);
  }

  return "";
};

const all = (node: Parents): string => {
  let index = -1;
  const result: string[] = [];

  while (++index < node.children.length) {
    result[index] = one(node.children[index] as Nodes);
  }

  return result.join("");
};
