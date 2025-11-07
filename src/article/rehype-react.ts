import type { Root } from "hast";
import { type Options, toJsxRuntime } from "hast-util-to-jsx-runtime";
import type { JSX } from "react";
import type { Plugin } from "unified";

export type RemarkRehypeOptions = Options;

export const rehypeReact: Plugin<[RemarkRehypeOptions], Root, JSX.Element> =
  function (options) {
    this.compiler = (tree, file) =>
      toJsxRuntime(tree as Root, {
        filePath: file.path,
        ...options,
      });
  };
