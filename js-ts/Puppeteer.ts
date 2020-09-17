import puppeteer, { Browser, Page } from "puppeteer";

export class Puppeteer {
  browser: Browser;

  constructor() {
    this.browser = null;
  }

  async init(): Promise<void> {
    if (this.browser)
      return console.warn(
        "Puppeteer already initialized. You called .init() twice."
      );

    this.browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROME_BIN || null,
      /**
       * We need these flags to run Puppeteer as root user.
       * @TODO We should find a way to run puppeteer as a different user
       * with restricted permissions. This is quite insecure currently!
       */
      args: ["--no-sandbox", "--headless"],
    });
  }

  /**
   * Given a url, orchestrate Puppeteer to launch the page in headless Chrome.
   * @param url
   */
  async fetch(url: string): Promise<Page> {
    if (!this.browser) {
      throw new Error("Puppeteer must be initialized before calling fetch()")
    }

    const page = await this.browser.newPage();
    await page.goto(url, { waitUntil: "load" });

    return page;
  }

  async close(): Promise<boolean> {
    await this.browser.close();
    return true;
  }
}

export default () => new Puppeteer();

