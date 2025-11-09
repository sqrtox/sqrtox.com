import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ArticleSection from "./article-section";
import Banner from "./banner";
import NoteSection from "./note/note-section";
import TagSection from "./tag-section";

export default async function TopPage() {
  return (
    <Stack spacing={8} paddingBottom={10} width="100%">
      <Banner />
      <Container>
        <Stack spacing={10}>
          <TagSection />
          <ArticleSection
            hideLastUpdated
            heading="最新記事"
            articlesLink={{
              label: "すべての記事",
              href: "/latest",
            }}
            limit={3}
            compare={(a, b) => b.createdAt.getTime() - a.createdAt.getTime()}
          />
          <NoteSection />
          <ArticleSection
            hidePublished
            heading="更新された記事"
            articlesLink={{
              label: "すべての更新記事",
              href: "/updated",
            }}
            limit={6}
            filter={(v) => v.updatedAt !== undefined}
            compare={(a, b) =>
              (b.updatedAt ?? b.createdAt).getTime() -
              (a.updatedAt ?? a.createdAt).getTime()
            }
          />
        </Stack>
      </Container>
    </Stack>
  );
}
