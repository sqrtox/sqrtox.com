import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Banner from "./banner";
import LatestArticleSection from "./latest-article-section";
import NoteSection from "./note/note-section";

export default async function TopPage() {
  return (
    <Stack spacing={8} paddingBottom={10} width="100%">
      <Banner />
      <Container>
        <Stack spacing={10}>
          <LatestArticleSection />
          <NoteSection />
        </Stack>
      </Container>
    </Stack>
  );
}
