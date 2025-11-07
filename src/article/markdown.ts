import rehypeSectionize from "@hbsnow/rehype-sectionize";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeExtractToc, { type Toc } from "@stefanprobst/rehype-extract-toc";
import type { JSX } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-github-alerts";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import OpenInNewIcon from "./open-in-new-icon";
import { type RehypeAssetsOptions, rehypeAssets } from "./rehype-assets";
import { rehypeFixFootnotes } from "./rehype-fix-footnotes";
import { rehypeLinkDecoration } from "./rehype-link-decoration";
import { rehypeReact } from "./rehype-react";

const { renderToStaticMarkup } = await import("react-dom/server");

export type Markdown = string;
export type Html = string;

export interface CompileOptions {
  resolveAssetsPath: RehypeAssetsOptions["resolve"];
}

export interface CompiledData {
  html: Html;
  toc?: Toc;
}

export const compile = async (
  markdown: Markdown,
  { resolveAssetsPath }: CompileOptions,
): Promise<CompiledData> =>
  await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGithubAlerts)
    .use(remarkEmoji)
    .use(remarkRehype)
    .use(rehypeFixFootnotes)
    .use(rehypePrettyCode, {
      defaultLang: "plaintext",
      theme: {
        dark: "material-theme-darker",
        light: "material-theme-lighter",
      },
      transformers: [
        transformerCopyButton({
          visibility: "hover",
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      content: (element) => {
        if (element.tagName.length > 2 || !element.tagName.startsWith("h")) {
          return {
            type: "text",
            value: ":)",
          };
        }

        const level = Number(element.tagName.slice(1));

        return {
          type: "element",
          tagName: "span",
          properties: {
            class: "headingLink",
          },
          children: [
            {
              type: "text",
              value: "#".repeat(level),
            },
          ],
        };
      },
    })
    .use(rehypeAssets, {
      resolve: resolveAssetsPath,
    })
    .use(rehypeLinkDecoration)
    .use(rehypeSectionize)
    .use(rehypeExtractToc)
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
      components: {
        "open-in-new-icon": OpenInNewIcon,
      },
    })
    .process(markdown)
    .then((file) => ({
      html: renderToStaticMarkup(file.result as JSX.Element),
      toc: file.data.toc,
    }));
