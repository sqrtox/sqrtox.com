import { relative, sep } from "node:path";
import { type AbsolutePath, NOTE_DIR } from "./path";

export const isNotePath = (path: AbsolutePath): boolean => {
  const rel = relative(NOTE_DIR, path).replaceAll(sep, "/");

  return !rel.startsWith("../");
};
