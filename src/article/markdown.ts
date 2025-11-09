import rehypeSectionize from "@hbsnow/rehype-sectionize";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeExtractToc, { type Toc } from "@stefanprobst/rehype-extract-toc";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkGithubAlerts from "remark-github-alerts";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { classes } from "./classes";
import { type RehypeAssetsOptions, rehypeAssets } from "./rehype-assets";
import { rehypeExtractText } from "./rehype-extract-text";
import { rehypeFixFootnotes } from "./rehype-fix-footnotes";
import { rehypeLinkDecoration } from "./rehype-link-decoration";

export type Markdown = string;
export type Html = string;

export interface CompileOptions {
  resolveAssetsPath: RehypeAssetsOptions["resolve"];
}

export interface CompiledData {
  html: Html;
  text: string;
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

        element.properties.class = classes.articleContentHeading;

        const level = Number(element.tagName.slice(1));

        return {
          type: "element",
          tagName: "span",
          properties: {
            class: classes.headingLink,
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
    .use(rehypeExtractText)
    .use(rehypeStringify)
    .process(markdown)
    .then((file) => {
      return {
        html: String(file),
        // TODO
        text: file.data.text as string,
        toc: file.data.toc,
      };
    });
