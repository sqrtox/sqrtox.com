import type { Root } from "hast";
import type { Plugin } from "unified";
import { toString_ } from "./hast-util-to-string";

declare module "vfile" {
  interface DataMap {
    text: string;
  }
}

export const rehypeExtractText: Plugin<[], Root, Root> =
  () => (tree, vfile) => {
    vfile.data.text = toString_(tree);
  };
