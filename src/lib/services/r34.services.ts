import * as cheerio from "cheerio";

enum R34Tags {
  copyright = "li.tag-type-copyright.tag",
  character = "li.tag-type-character.tag",
  general = "li.tag-type-general.tag",
  meta = "li.tag-type-metadata.tag",
}

export async function scrape(url: string) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; r34-tagger/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const tags: string[] = [];

  // const copyrightTags = $(R34Tags.copyright).toArray();
  // tags.push(
  //   ...copyrightTags.map((tag) => $(tag).find("a").eq(1).text().trim())
  // );

  const characterTags = $(R34Tags.character).toArray();
  tags.push(
    ...characterTags.map((tag) => $(tag).find("a").eq(1).text().trim())
  );

  const generalTags = $(R34Tags.general).toArray();
  tags.push(
    ...generalTags.map((tag) => $(tag).find("a").eq(1).text().trim())
  );

  // const metaTags = $(R34Tags.meta).toArray();

  return tags.join(", ");
}
