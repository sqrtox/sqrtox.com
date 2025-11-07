import { existsSync } from "node:fs";
import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { type ParseArgsConfig, parseArgs } from "node:util";
import { watch } from "chokidar";
import { Asset, AssetManager } from "#src/article/asset";
import { ARTICLE_DIR, ASSETS_DIR } from "#src/article/path";

const cli = {
  options: {
    watch: {
      type: "boolean",
    },
  },
} satisfies ParseArgsConfig;

const args = parseArgs(cli);

if (existsSync(ASSETS_DIR)) {
  await rm(ASSETS_DIR, {
    recursive: true,
  });
}

const assets = new AssetManager();

if (args.values.watch) {
  watch(ARTICLE_DIR)
    .on("add", async (path) => {
      await assets.create(path);
    })
    .on("change", async (path) => {
      await assets.revoke(path);
      await assets.create(path);
    })
    .on("unlink", async (path) => {
      await assets.revoke(path);
    });
} else {
  const dirents = await readdir(ARTICLE_DIR, {
    recursive: true,
    withFileTypes: true,
  });

  for (const dirent of dirents) {
    if (!dirent.isFile()) continue;
    if (dirent.name === "index.md") continue;

    const asset = await Asset.create(join(dirent.parentPath, dirent.name));

    await asset.write();
  }
}
