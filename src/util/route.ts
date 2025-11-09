export const routes = {
  home: "/",
  about: "/about",
  latest: "/latest",
  tags: "/tags",
  updated: "/updated",
  tag: (id: string) => `/tag/${encodeURIComponent(id)}`,
  article: (slug: string) => `/article/${encodeURIComponent(slug)}`,
  articleHistory: (slug: string) =>
    `/article/${encodeURIComponent(slug)}/history`,
};
