import { Note } from "#src/article/note";
import NoteCardList, { type CompiledNote } from "./note-card-list";

const compiledNotes = async (): Promise<CompiledNote[]> => {
  const compiled: CompiledNote[] = [];

  for (const note of await Note.allNotes()) {
    compiled.push({
      slug: note.slug,
      html: await note.html(),
      text: await note.text(),
      time: note.updatedAt ?? note.createdAt,
    });
  }

  return compiled.sort((a, b) => b.time.getTime() - a.time.getTime());
};

export default async function NoteCardListRenderer() {
  const notes = await compiledNotes();

  return <NoteCardList notes={notes} />;
}
