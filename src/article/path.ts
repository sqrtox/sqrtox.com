import { join } from "node:path";

export type AbsolutePath = string;
export type RelativePath = string;
export type Path = AbsolutePath | RelativePath;

export const ROOT_DIR: AbsolutePath = process.cwd();

export const ARTICLE_DIR_REL: RelativePath = "article";
export const ARTICLE_DIR: AbsolutePath = join(ROOT_DIR, ARTICLE_DIR_REL);

export const NOTE_DIR: AbsolutePath = join(ARTICLE_DIR, "note");

export const DATA_DIR: AbsolutePath = join(ROOT_DIR, ".data");

export const REVISION_DIR: AbsolutePath = join(DATA_DIR, "revision");

export const ASSETS_DIR: AbsolutePath = join(ROOT_DIR, "public/.assets");
