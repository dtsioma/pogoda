export const getSlugFromName = (q: string) => {
  const slug: string = q
    .split(/\s|,\s/)
    .map((x) => x.toLowerCase())
    .join("-");
  return slug;
};
