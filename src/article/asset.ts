import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm } from "node:fs/promises";
import { join, parse, relative, sep } from "node:path";
import { fileTypeFromBuffer } from "file-type";
import { ASSETS_DIR, NOTE_DIR } from "#src/article/path";
import { Rc } from "#src/util/rc";

export class Asset {
  readonly #srcPath: string;
  readonly #path: string;
  readonly name: string;
  readonly hash: string;

  private constructor(
    srcPath: string,
    path: string,
    name: string,
    hash: string,
  ) {
    this.#srcPath = srcPath;
    this.#path = path;
    this.name = name;
    this.hash = hash;
  }

  static async create(srcPath: string): Promise<Asset> {
    const data = await readFile(srcPath);
    const hash = createHash("sha256").update(data).digest("hex").slice(0, 32);
    const fileType = await fileTypeFromBuffer(data);
    const assetName = fileType ? `${hash}.${fileType.ext}` : hash;
    const path = join(ASSETS_DIR, assetName);

    return new Asset(srcPath, path, assetName, hash);
  }

  exists(): boolean {
    return existsSync(this.#path);
  }

  async write(): Promise<void> {
    if (this.exists()) return;

    if (!existsSync(ASSETS_DIR)) {
      await mkdir(ASSETS_DIR, {
        recursive: true,
      });
    }

    await cp(this.#srcPath, this.#path);
  }

  async remove(): Promise<void> {
    if (!this.exists()) return;

    await rm(this.#path);
  }
}

export class AssetManager {
  readonly #counter: Rc<string> = new Rc();
  readonly #assets: Map<string, Asset> = new Map();

  static #isValidSrcPath(path: string): boolean {
    if (parse(path).base === "index.md") {
      return false;
    }

    const rel = relative(NOTE_DIR, path).replaceAll(sep, "/");

    if (!rel.startsWith("../")) {
      return false;
    }

    return true;
  }

  async create(path: string): Promise<void> {
    if (!AssetManager.#isValidSrcPath(path)) return;
    if (this.#assets.has(path)) return;

    const asset = await Asset.create(path);

    this.#assets.set(path, asset);
    this.#counter.add(asset.hash);
    await asset.write();
  }

  async revoke(path: string): Promise<void> {
    if (!AssetManager.#isValidSrcPath(path)) return;

    const asset = this.#assets.get(path);
    if (!asset) return;

    this.#assets.delete(path);

    const purged = this.#counter.remove(asset.hash);
    if (!purged) return;

    await asset.remove();
  }
}
