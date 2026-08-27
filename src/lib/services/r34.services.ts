import puppeteer from "@cloudflare/puppeteer";

export async function scrape(url: string, browserBinding: unknown) {
  const browser = await puppeteer.launch(browserBinding as never);
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    const tags = await page.$$eval(
      'li[class*="tag-type-"] a[href^="index.php?page=post&s=list&tags="]',
      (elements) => elements.map((el) => el.textContent?.trim() ?? "")
    );

    return tags.join(", ");
  } finally {
    await browser.close();
  }
}
