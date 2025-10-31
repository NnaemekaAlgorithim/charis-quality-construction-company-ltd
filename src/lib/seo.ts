export function buildMeta({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url?: string;
  image?: string;
}) {
  return {
    title: `${title} | Charis Quality Construction Ltd.`,
    description,
    openGraph: {
      title,
      description,
      url,
      images: image ? [image] : [],
    },
  };
}
