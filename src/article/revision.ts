import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import type { Path } from "chokidar/handler.js";
import simpleGit, { type SimpleGit } from "simple-git";
import type { ArticleBase } from "./article";
import {
  ARTICLE_DIR_REL,
  REVISION_DIR,
  type RelativePath,
  ROOT_DIR,
} from "./path";
import type { SlugPath } from "./slug";

export interface Commit {
  hash: string;
  pathHash: string;
  message: string;
  timestamp: number;
}

let git: SimpleGit | undefined;

export const getGit = (): SimpleGit => {
  git ??= simpleGit();

  return git;
};

const getCommits = async (
  path: RelativePath,
): Promise<IterableIterator<Commit>> => {
  const git = getGit();
  const result = await git.log(["--follow", "--name-status", "--", path]);
  const map = function* (): IterableIterator<Commit> {
    for (const commit of result.all) {
      const path = commit.diff?.files[0].file.replaceAll(sep, "/");

      if (path === undefined) {
        throw new TypeError(`Commit ${commit.hash} file location unknown`);
      }

      yield {
        message: commit.message,
        hash: commit.hash,
        timestamp: new Date(commit.date).getTime(),
        pathHash: createHash("sha256").update(path, "utf8").digest("hex"),
      };
    }
  };

  return map();
};

type ArticleLocator = (slug: SlugPath, base?: ArticleBase) => RelativePath;

const ARTICLE_LOCATORS: ArticleLocator[] = [
  // article/[...base]/[...slug]/index.md
  (slug, base = "") => join(ARTICLE_DIR_REL, base, slug, "index.md"),
  // src/contents/[...base]/[slug]/index.md
  (slug, base = "") => join("src/contents", base, slug, "index.md"),
  // src/contents/[slug].md
  (slug) => {
    let slug_: string = slug;

    // Change spelling
    if (slug_ === "acknowledgments") {
      slug_ = "acknowledgements";
    }

    return join("src/contents", `${slug_}.md`);
  },
];

const getRevision = async (
  paths: Iterable<RelativePath>,
): Promise<Commit[]> => {
  const revision: Map<Commit["hash"], Commit> = new Map();

  for (const path of paths) {
    for (const commit of await getCommits(path)) {
      revision.set(commit.hash, commit);
    }
  }

  return [...revision.values()];
};

export const getArticleRevision = async (
  slug: SlugPath,
  base?: ArticleBase,
): Promise<Commit[]> =>
  await getRevision(ARTICLE_LOCATORS.map((locate) => locate(slug, base)));

type NoteLocator = (id: string) => RelativePath;

const NOTE_LOCATORS: NoteLocator[] = [
  // article/note/[id].md
  (id) => join(ARTICLE_DIR_REL, "note", `${id}.md`),
];

export const getNoteRevision = async (id: string): Promise<Commit[]> =>
  await getRevision(NOTE_LOCATORS.map((locate) => locate(id)));

const REVISION_ID_LEN = 16;

export const getRevisionId = (path: Path): string =>
  createHash("sha256")
    .update(relative(ROOT_DIR, path).replaceAll(sep, "/"))
    .digest("hex")
    .slice(0, REVISION_ID_LEN);

export const readRevision = async (path: Path): Promise<Commit[]> => {
  const revisionId = getRevisionId(path);
  const revisionPath = join(REVISION_DIR, `${revisionId}.json`);

  if (!existsSync(revisionPath)) {
    return [];
  }

  const revisionData = await readFile(revisionPath, "utf8");
  const revision = JSON.parse(revisionData);

  return revision;
};

export interface RevisionTime {
  createdAt: Date;
  updatedAt?: Date;
}

export const getRevisionTime = async (
  commits: Commit[],
  path: Path,
): Promise<RevisionTime> => {
  let oldest: Commit | undefined;
  let latest: Commit | undefined;

  for (const commit of commits) {
    oldest ??= commit;
    latest ??= commit;

    if (commit.timestamp < oldest.timestamp) {
      oldest = commit;
    }

    if (commit.timestamp > latest.timestamp) {
      latest = commit;
    }
  }

  if (latest?.hash === oldest?.hash) {
    latest = undefined;
  }

  let createdAtTimestamp = oldest?.timestamp;
  const updatedAtTimestamp = latest?.timestamp;

  if (createdAtTimestamp === undefined) {
    const stats = await stat(path);

    createdAtTimestamp = stats.birthtimeMs;
  }

  const createdAt = new Date(createdAtTimestamp);
  const updatedAt =
    updatedAtTimestamp === undefined ? undefined : new Date(updatedAtTimestamp);

  return {
    createdAt,
    updatedAt,
  };
};
