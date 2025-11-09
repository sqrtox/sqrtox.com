import { readdir, readFile } from "node:fs/promises";
import { join, parse, relative, sep } from "node:path";
import {
  type CompiledData,
  compile,
  type Html,
  type Markdown,
} from "./markdown";
import { type AbsolutePath, NOTE_DIR } from "./path";
import { getNoteRevision, getRevisionTime } from "./revision";
export class Note {
  readonly slug: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly markdown: Markdown;

  private constructor(
    slug: string,
    markdown: Markdown,
    createdAt: Date,
    updatedAt?: Date,
  ) {
    this.slug = slug;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.markdown = markdown;
  }

  static async create(slug: string): Promise<Note> {
    const path = join(NOTE_DIR, `${slug}.md`);
    const markdown = await readFile(path, "utf8");
    const commits = await getNoteRevision(path);
    const { createdAt, updatedAt } = await getRevisionTime(commits, path);

    // TODO
    return new Note(slug, markdown, createdAt, updatedAt);
  }

  #compiled?: CompiledData;

  async #compile(): Promise<CompiledData> {
    if (!this.#compiled) {
      this.#compiled = await compile(this.markdown, {
        // TODO
        resolveAssetsPath: (src) => src,
      });
    }

    return this.#compiled;
  }

  async html(): Promise<Html> {
    const { html } = await this.#compile();

    return html;
  }

  async text(): Promise<string> {
    const { text } = await this.#compile();

    return text;
  }

  static isNotePath(path: AbsolutePath): boolean {
    const rel = relative(NOTE_DIR, path).replaceAll(sep, "/");

    return !rel.startsWith("../");
  }

  static async allNotes(): Promise<Note[]> {
    const files = await readdir(NOTE_DIR);
    const notes: Note[] = [];

    for (const file of files) {
      const p = parse(file);

      if (p.ext !== ".md") continue;

      notes.push(await Note.create(p.name));
    }

    return notes;
  }
}
