import type { Metadata } from "next";
import AboutPage from "#src/layout/about-page/about-page";

export const metadata: Metadata = {
  title: "About",
  description: "このサイトと私について。",
  openGraph: {
    type: "article",
    url: "/about",
  },
};

export default function About() {
  return <AboutPage />;
}
