import { existsSync } from "node:fs";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join, parse, relative, sep } from "node:path";
import { type ParseArgsConfig, parseArgs } from "node:util";
import type { ArticleBase } from "#src/article/article";
import { isNotePath } from "#src/article/note";
import {
  type AbsolutePath,
  ARTICLE_DIR,
  REVISION_DIR,
  ROOT_DIR,
} from "#src/article/path";
import {
  type Commit,
  getArticleRevision,
  getGit,
  getNoteRevision,
  getRevisionId,
} from "#src/article/revision";

const writeRevision = async (
  path: AbsolutePath,
  commits: Commit[],
): Promise<void> => {
  const revisionId = getRevisionId(path);
  const revisionPath = join(REVISION_DIR, `${revisionId}.json`);

  await writeFile(revisionPath, JSON.stringify(commits), "utf8");

  console.log(
    `Written revision "${relative(ROOT_DIR, path).replaceAll(sep, "/")}" -> "${relative(ROOT_DIR, revisionPath).replaceAll(sep, "/")}"`,
  );
};

const buildRevision = async (path: AbsolutePath): Promise<void> => {
  const p = parse(path);
  let revision: Commit[];

  if (isNotePath(path)) {
    if (p.ext !== ".md") return;

    revision = await getNoteRevision(p.name);
  } else {
    if (p.base !== "index.md") return;

    const parentPath = parse(p.dir);
    const slugPath = relative(parentPath.dir, p.dir).replaceAll(sep, "/");

    // article/[...base]/[...slug]
    const base: ArticleBase = relative(ARTICLE_DIR, parentPath.dir).replaceAll(
      sep,
      "/",
    );

    revision = await getArticleRevision(slugPath, base);
  }

  await writeRevision(path, revision);
};

const buildRevisionFull = async (): Promise<void> => {
  if (existsSync(REVISION_DIR)) {
    await rm(REVISION_DIR, {
      recursive: true,
    });
  }

  await mkdir(REVISION_DIR, {
    recursive: true,
  });

  const dirents = await readdir(ARTICLE_DIR, {
    recursive: true,
    withFileTypes: true,
  });

  for (const dirent of dirents) {
    if (!dirent.isFile()) continue;

    const path = join(dirent.parentPath, dirent.name);

    await buildRevision(path);
  }
};

const buildRevisionDiff = async (): Promise<void> => {
  const git = getGit();
  const result = await git.diffSummary(["HEAD~1", "HEAD"]);

  for (const { file } of result.files) {
    const path = join(ROOT_DIR, file);

    await buildRevision(path);
  }
};

const cli = {
  options: {
    diff: {
      type: "boolean",
    },
  },
} satisfies ParseArgsConfig;

const args = parseArgs(cli);

if (!existsSync(REVISION_DIR)) {
  await mkdir(REVISION_DIR, {
    recursive: true,
  });
}

if (args.values.diff) {
  await buildRevisionDiff();
} else {
  await buildRevisionFull();
}
