import { readFile } from "node:fs/promises";
import type { Root } from "hast";
import { selectAll } from "hast-util-select";
import imageSize from "image-size";
import type { Plugin } from "unified";
import { Asset } from "./asset";

export interface RehypeAssetsOptions {
  resolve: (src: string) => string | Promise<string>;
}

export const rehypeAssets: Plugin<[RehypeAssetsOptions], Root, Root> =
  ({ resolve }) =>
  async (tree) => {
    for (const node of selectAll("img", tree)) {
      if (typeof node.properties.src !== "string") continue;

      const path = await resolve(node.properties.src);
      const asset = await Asset.create(path);
      const buf = await readFile(path);
      const dims = imageSize(buf);

      const image = { ...node };
      const src = `/.assets/${asset.name}`;

      Object.assign(image.properties, {
        loading: "lazy",
        decoding: "async",
        width: dims.width,
        height: dims.height,
        src,
        class: "articleImage",
      });

      Object.assign(node, {
        tagName: "div",
        properties: {
          class: "articleImageContainer",
        },
        children: [
          {
            type: "element",
            tagName: "a",
            properties: {
              href: src,
              target: "_blank",
              rel: "noopener noreferrer",
            },
            children: [image],
          },
        ],
      });
    }
  };
